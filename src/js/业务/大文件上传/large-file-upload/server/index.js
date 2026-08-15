import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const UPLOAD_ROOT = path.join(ROOT, 'uploads')
const CHUNK_ROOT = path.join(UPLOAD_ROOT, 'chunks')
const META_ROOT = path.join(UPLOAD_ROOT, 'meta')
const COMPLETE_ROOT = path.join(UPLOAD_ROOT, 'complete')
const PORT = Number(process.env.PORT) || 3080

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }
})

function md5(buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex')
}

function chunkDir(fileHash) {
  return path.join(CHUNK_ROOT, fileHash)
}

function metaPath(fileHash) {
  return path.join(META_ROOT, `${fileHash}.json`)
}

function completePath(fileHash) {
  return path.join(COMPLETE_ROOT, fileHash)
}

async function readMeta(fileHash) {
  try {
    const raw = await fs.readFile(metaPath(fileHash), 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function writeMeta(fileHash, meta) {
  await fs.mkdir(META_ROOT, { recursive: true })
  await fs.writeFile(metaPath(fileHash), JSON.stringify(meta, null, 2))
}

async function listUploadedChunks(fileHash) {
  const dir = chunkDir(fileHash)
  try {
    const names = await fs.readdir(dir)
    const chunks = []
    for (const name of names) {
      if (!/^\d+$/.test(name)) continue
      const buf = await fs.readFile(path.join(dir, name))
      chunks.push({
        index: Number(name),
        chunkHash: md5(buf),
        size: buf.length
      })
    }
    chunks.sort((a, b) => a.index - b.index)
    return chunks
  } catch {
    return []
  }
}

async function ensureDirs() {
  await Promise.all([
    fs.mkdir(CHUNK_ROOT, { recursive: true }),
    fs.mkdir(META_ROOT, { recursive: true }),
    fs.mkdir(COMPLETE_ROOT, { recursive: true })
  ])
}

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use('/vendor/spark-md5', express.static(path.join(ROOT, 'node_modules/spark-md5')))
app.use(express.static(path.join(ROOT, 'public')))

app.post('/api/check', async (req, res) => {
  const { fileHash, fileName, fileSize, chunkSize } = req.body || {}
  if (!fileHash || !fileName || !fileSize || !chunkSize) {
    res.status(400).json({ ok: false, message: '缺少 fileHash / fileName / fileSize / chunkSize' })
    return
  }

  try {
    await fs.access(completePath(fileHash))
    res.json({ ok: true, instant: true, message: '秒传命中，文件已在服务端' })
    return
  } catch {
    // not merged yet
  }

  const uploaded = await listUploadedChunks(fileHash)
  const meta = (await readMeta(fileHash)) || {
    fileName,
    fileSize: Number(fileSize),
    chunkSize: Number(chunkSize),
    chunkHashes: {},
    merged: false
  }
  meta.fileName = fileName
  meta.fileSize = Number(fileSize)
  meta.chunkSize = Number(chunkSize)
  await writeMeta(fileHash, meta)

  res.json({
    ok: true,
    instant: false,
    uploaded,
    message: uploaded.length ? `已有 ${uploaded.length} 片，可续传` : '未命中秒传，开始分片上传'
  })
})

app.get('/api/chunks/:fileHash', async (req, res) => {
  const uploaded = await listUploadedChunks(req.params.fileHash)
  res.json({ ok: true, uploaded })
})

app.post('/api/chunk', upload.single('chunk'), async (req, res) => {
  const fileHash = String(req.body.fileHash || '')
  const chunkIndex = Number(req.body.chunkIndex)
  const clientHash = String(req.body.chunkHash || '')
  const file = req.file

  if (!fileHash || Number.isNaN(chunkIndex) || !clientHash || !file) {
    res.status(400).json({ ok: false, code: 'BAD_REQUEST', message: '分片参数不完整' })
    return
  }

  const serverHash = md5(file.buffer)
  if (serverHash !== clientHash) {
    res.status(409).json({
      ok: false,
      code: 'CHUNK_HASH_MISMATCH',
      chunkIndex,
      clientHash,
      serverHash,
      message: `第 ${chunkIndex} 片后端校验失败，需要重传该片`
    })
    return
  }

  const dir = chunkDir(fileHash)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, String(chunkIndex)), file.buffer)

  const meta = (await readMeta(fileHash)) || {
    fileName: req.body.fileName || 'unknown',
    fileSize: Number(req.body.fileSize) || 0,
    chunkSize: Number(req.body.chunkSize) || file.buffer.length,
    chunkHashes: {},
    merged: false
  }
  meta.chunkHashes[chunkIndex] = serverHash
  await writeMeta(fileHash, meta)

  res.json({
    ok: true,
    chunkIndex,
    chunkHash: serverHash,
    message: `第 ${chunkIndex} 片后端校验通过`
  })
})

app.post('/api/merge', async (req, res) => {
  const { fileHash, fileName, fileSize, chunkSize, chunkHashes } = req.body || {}
  if (!fileHash || !fileName || !fileSize || !chunkSize || !Array.isArray(chunkHashes)) {
    res.status(400).json({ ok: false, message: '合并参数不完整' })
    return
  }

  const expectedCount = Math.ceil(Number(fileSize) / Number(chunkSize))
  if (chunkHashes.length !== expectedCount) {
    res.status(400).json({
      ok: false,
      code: 'MANIFEST_LENGTH',
      message: `清单长度 ${chunkHashes.length} 与期望分片数 ${expectedCount} 不一致`
    })
    return
  }

  const bad = []
  for (let i = 0; i < expectedCount; i++) {
    const expectedHash = chunkHashes[i]
    const file = path.join(chunkDir(fileHash), String(i))
    try {
      const buf = await fs.readFile(file)
      const diskHash = md5(buf)
      if (diskHash !== expectedHash) {
        bad.push({ index: i, reason: 'HASH_MISMATCH', expectedHash, diskHash })
      }
    } catch {
      bad.push({ index: i, reason: 'MISSING' })
    }
  }

  if (bad.length) {
    res.status(409).json({
      ok: false,
      code: 'MERGE_VERIFY_FAILED',
      badChunks: bad,
      message: `合并前校验失败，坏片：${bad.map((item) => item.index).join(', ')}`
    })
    return
  }

  await fs.mkdir(COMPLETE_ROOT, { recursive: true })
  const dest = completePath(fileHash)
  const handle = await fs.open(dest, 'w')
  try {
    for (let i = 0; i < expectedCount; i++) {
      const buf = await fs.readFile(path.join(chunkDir(fileHash), String(i)))
      await handle.write(buf)
    }
  } finally {
    await handle.close()
  }

  const merged = await fs.readFile(dest)
  if (merged.length !== Number(fileSize)) {
    await fs.unlink(dest).catch(() => {})
    res.status(500).json({
      ok: false,
      code: 'SIZE_MISMATCH',
      message: `合并后大小 ${merged.length}，期望 ${fileSize}`
    })
    return
  }

  const meta = (await readMeta(fileHash)) || {}
  meta.fileName = fileName
  meta.fileSize = Number(fileSize)
  meta.chunkSize = Number(chunkSize)
  meta.merged = true
  meta.mergedAt = new Date().toISOString()
  await writeMeta(fileHash, meta)

  res.json({
    ok: true,
    fileHash,
    fileName,
    fileSize: merged.length,
    downloadUrl: `/api/download/${fileHash}`,
    message: '合并完成，全部分片校验通过'
  })
})

app.get('/api/download/:fileHash', async (req, res) => {
  const fileHash = req.params.fileHash
  const meta = await readMeta(fileHash)
  try {
    await fs.access(completePath(fileHash))
  } catch {
    res.status(404).json({ ok: false, message: '文件尚未合并完成' })
    return
  }
  res.download(completePath(fileHash), meta?.fileName || fileHash)
})

app.post('/api/reset', async (_req, res) => {
  await fs.rm(UPLOAD_ROOT, { recursive: true, force: true })
  await ensureDirs()
  res.json({ ok: true, message: '已清空 uploads' })
})

await ensureDirs()
app.listen(PORT, '127.0.0.1', () => {
  console.log(`large-file-upload-demo  http://127.0.0.1:${PORT}`)
})
