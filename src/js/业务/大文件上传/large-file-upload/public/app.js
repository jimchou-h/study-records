function pLimit(concurrency) {
  const queue = []
  let active = 0

  const pump = () => {
    if (active >= concurrency || queue.length === 0) return
    active += 1
    const job = queue.shift()
    job.fn().then(job.resolve, job.reject).finally(() => {
      active -= 1
      pump()
    })
  }

  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject })
      pump()
    })
}

class HashClient {
  constructor() {
    this.worker = new Worker('/hash.worker.js')
    this.seq = 0
    this.pending = new Map()
    this.worker.onmessage = (event) => {
      const { id, hash, error } = event.data
      const job = this.pending.get(id)
      if (!job) return
      this.pending.delete(id)
      if (error) job.reject(new Error(error))
      else job.resolve(hash)
    }
  }

  send(payload) {
    const id = ++this.seq
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.worker.postMessage({ id, ...payload })
    })
  }

  sample(file) {
    return this.send({ type: 'sample', file })
  }

  chunk(blob) {
    return this.send({ type: 'chunk', blob })
  }
}

const $ = (id) => document.getElementById(id)

const els = {
  file: $('file'),
  fileMeta: $('file-meta'),
  chunkSize: $('chunk-size'),
  concurrency: $('concurrency'),
  corruptEnabled: $('corrupt-enabled'),
  corruptIndex: $('corrupt-index'),
  start: $('start'),
  abort: $('abort'),
  reset: $('reset'),
  progress: $('progress'),
  progressText: $('progress-text'),
  log: $('log'),
  steps: [...document.querySelectorAll('[data-step]')],
  result: $('result')
}

const hashClient = new HashClient()
let abortFlag = false
const corruptTried = new Set()

function log(message, level = 'info') {
  const line = document.createElement('div')
  line.className = `log-line log-${level}`
  line.innerHTML = `<time>${new Date().toLocaleTimeString()}</time><span>${message}</span>`
  els.log.appendChild(line)
  els.log.scrollTop = els.log.scrollHeight
}

function setStep(name) {
  els.steps.forEach((node) => {
    node.classList.toggle('is-active', node.dataset.step === name)
    if (node.dataset.step === name) node.classList.add('is-done-prev')
  })
}

function setProgress(value, text) {
  const pct = Math.max(0, Math.min(100, value))
  els.progress.style.width = `${pct}%`
  els.progressText.textContent = text || `${pct.toFixed(1)}%`
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function throwIfAborted() {
  if (abortFlag) throw new Error('已中止')
}

async function api(url, options) {
  const res = await fetch(url, options)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(data.message || `HTTP ${res.status}`)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}

function sliceChunk(file, index, chunkSize) {
  const start = index * chunkSize
  return file.slice(start, Math.min(start + chunkSize, file.size))
}

function corruptBlob(blob) {
  return blob.arrayBuffer().then((buffer) => {
    const copy = new Uint8Array(buffer.slice(0))
    copy[0] = copy[0] ^ 0xff
    return new Blob([copy], { type: blob.type })
  })
}

async function uploadOneChunk({
  file,
  fileHash,
  index,
  chunkSize,
  limit
}) {
  return limit(async () => {
    throwIfAborted()
    const original = sliceChunk(file, index, chunkSize)
    const chunkHash = await hashClient.chunk(original)
    log(`分片 #${index}  hash=${chunkHash.slice(0, 8)}…  size=${formatSize(original.size)}`)

    const maxRetry = 3
    for (let attempt = 1; attempt <= maxRetry; attempt += 1) {
      throwIfAborted()
      const shouldCorrupt =
        els.corruptEnabled.checked &&
        Number(els.corruptIndex.value) === index &&
        !corruptTried.has(index)

      let bodyBlob = original
      if (shouldCorrupt) {
        corruptTried.add(index)
        bodyBlob = await corruptBlob(original)
        log(`模拟传输损坏：第 ${index} 片字节已改，但仍携带原始 chunkHash`, 'warn')
      }

      const form = new FormData()
      form.append('fileHash', fileHash)
      form.append('chunkIndex', String(index))
      form.append('chunkHash', chunkHash)
      form.append('fileName', file.name)
      form.append('fileSize', String(file.size))
      form.append('chunkSize', String(chunkSize))
      form.append('chunk', bodyBlob, `chunk-${index}`)

      try {
        const data = await api('/api/chunk', { method: 'POST', body: form })
        log(data.message, 'ok')
        return { index, chunkHash }
      } catch (error) {
        if (error.data?.code === 'CHUNK_HASH_MISMATCH') {
          log(
            `后端拒收第 ${index} 片（client=${error.data.clientHash.slice(0, 8)} server=${error.data.serverHash.slice(0, 8)}），准备只重传该片`,
            'warn'
          )
          continue
        }
        throw error
      }
    }
    throw new Error(`第 ${index} 片超过重试次数`)
  })
}

async function startUpload() {
  const file = els.file.files?.[0]
  if (!file) {
    log('请先选择文件', 'warn')
    return
  }

  abortFlag = false
  corruptTried.clear()
  els.result.hidden = true
  els.start.disabled = true
  els.abort.disabled = false
  setProgress(0, '准备中')

  const chunkSize = Number(els.chunkSize.value) * 1024 * 1024
  const concurrency = Number(els.concurrency.value)
  const chunkCount = Math.ceil(file.size / chunkSize)
  const limit = pLimit(concurrency)

  try {
    setStep('hash')
    log(`开始采样哈希（头 / 中 / 尾 各 2MB + 文件 size），文件 ${file.name} / ${formatSize(file.size)}`)
    const fileHash = await hashClient.sample(file)
    throwIfAborted()
    log(`采样 fileHash=${fileHash}`, 'ok')
    setProgress(4, '秒传检查中')

    setStep('check')
    const check = await api('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileHash,
        fileName: file.name,
        fileSize: file.size,
        chunkSize
      })
    })
    log(check.message, check.instant ? 'ok' : 'info')

    if (check.instant) {
      setStep('done')
      setProgress(100, '秒传完成')
      els.result.hidden = false
      els.result.innerHTML = `秒传命中，无需上传分片。<a href="/api/download/${fileHash}">下载已有文件</a>`
      return
    }

    setStep('chunks')
    const uploadedSet = new Set((check.uploaded || []).map((item) => item.index))
    const pending = []
    const chunkHashes = Array.from({ length: chunkCount }, () => '')

    for (const item of check.uploaded || []) {
      chunkHashes[item.index] = item.chunkHash
    }

    for (let i = 0; i < chunkCount; i += 1) {
      if (uploadedSet.has(i)) continue
      pending.push(i)
    }

    log(
      `共 ${chunkCount} 片，每片 ${els.chunkSize.value}MB，并发 ${concurrency}。已上传 ${uploadedSet.size}，待传 ${pending.length}`
    )

    let finished = uploadedSet.size
    const tasks = pending.map((index) =>
      uploadOneChunk({ file, fileHash, index, chunkSize, limit }).then((result) => {
        chunkHashes[result.index] = result.chunkHash
        finished += 1
        const pct = 4 + (finished / chunkCount) * 90
        setProgress(pct, `上传 ${finished}/${chunkCount}`)
      })
    )
    await Promise.all(tasks)
    throwIfAborted()

    setStep('merge')
    setProgress(96, '合并校验中')
    log('全部分片到齐，请求后端按清单再核一遍后合并')
    const merged = await api('/api/merge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileHash,
        fileName: file.name,
        fileSize: file.size,
        chunkSize,
        chunkHashes
      })
    })
    log(merged.message, 'ok')
    setStep('done')
    setProgress(100, '完成')
    els.result.hidden = false
    els.result.innerHTML = `${merged.message}。<a href="${merged.downloadUrl}">下载合并文件</a>`
  } catch (error) {
    if (error.message === '已中止') {
      log('已中止。再选同一文件可续传未完成分片', 'warn')
      setProgress(0, '已中止')
    } else if (error.data?.code === 'MERGE_VERIFY_FAILED') {
      const ids = error.data.badChunks.map((item) => item.index).join(', ')
      log(`合并校验失败，坏片 index: ${ids}。只需重传这些片，不必整文件重来`, 'warn')
    } else {
      log(error.message, 'error')
    }
    setStep('')
  } finally {
    els.start.disabled = false
    els.abort.disabled = true
  }
}

els.file.addEventListener('change', () => {
  const file = els.file.files?.[0]
  els.fileMeta.textContent = file
    ? `${file.name} · ${formatSize(file.size)} · 约 ${Math.ceil(file.size / (Number(els.chunkSize.value) * 1024 * 1024))} 片`
    : '未选择文件'
})

els.chunkSize.addEventListener('change', () => {
  els.file.dispatchEvent(new Event('change'))
})

els.start.addEventListener('click', () => {
  startUpload()
})

els.abort.addEventListener('click', () => {
  abortFlag = true
})

els.reset.addEventListener('click', async () => {
  const data = await api('/api/reset', { method: 'POST' })
  log(data.message, 'ok')
  els.result.hidden = true
  setProgress(0, '就绪')
})
