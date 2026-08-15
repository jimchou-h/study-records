/* global SparkMD5 */
importScripts('/vendor/spark-md5/spark-md5.min.js')

const SAMPLE_SIZE = 2 * 1024 * 1024

function hashBuffer(buffer) {
  return SparkMD5.ArrayBuffer.hash(buffer)
}

function sizePrefix(fileSize) {
  const view = new ArrayBuffer(8)
  const dv = new DataView(view)
  dv.setUint32(0, fileSize >>> 0, true)
  dv.setUint32(4, Math.floor(fileSize / 0x100000000), true)
  return view
}

async function sampleHash(file) {
  const spark = new SparkMD5.ArrayBuffer()
  spark.append(sizePrefix(file.size))

  if (file.size <= SAMPLE_SIZE * 3) {
    spark.append(await file.arrayBuffer())
    return spark.end()
  }

  const mid = Math.floor(file.size / 2) - Math.floor(SAMPLE_SIZE / 2)
  const slices = [
    file.slice(0, SAMPLE_SIZE),
    file.slice(mid, mid + SAMPLE_SIZE),
    file.slice(file.size - SAMPLE_SIZE, file.size)
  ]

  for (const part of slices) {
    spark.append(await part.arrayBuffer())
  }
  return spark.end()
}

self.onmessage = async (event) => {
  const { id, type, file, blob } = event.data
  try {
    if (type === 'sample') {
      const hash = await sampleHash(file)
      self.postMessage({ id, hash })
      return
    }
    if (type === 'chunk') {
      const hash = hashBuffer(await blob.arrayBuffer())
      self.postMessage({ id, hash })
      return
    }
    throw new Error(`未知任务: ${type}`)
  } catch (error) {
    self.postMessage({ id, error: error instanceof Error ? error.message : String(error) })
  }
}
