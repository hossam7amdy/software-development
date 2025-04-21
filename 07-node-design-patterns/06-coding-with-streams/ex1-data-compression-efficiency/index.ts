import { PassThrough } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import { createBrotliCompress, createGzip, createDeflate } from 'zlib'

const filename = process.argv[2]
const inputStream = createReadStream(filename)

const summary = {
  Gzip: {},
  Deflate: {},
  Brotli: {}
}

const monitor = (algorithm: keyof typeof summary) => {
  let size = 0
  const monitor = new PassThrough()

  monitor.on('data', chunk => {
    size += chunk.length
  })
  monitor.on('end', () => {
    summary[algorithm]['original'] = (size / 1024).toFixed(2) + 'kb'
  })

  return monitor
}

const benchmark = (algorithm: keyof typeof summary) => {
  let size = 0
  const start = performance.now()
  const monitor = new PassThrough()

  monitor.on('data', chunk => {
    size += chunk.length
  })
  monitor.on('end', () => {
    const end = performance.now()

    summary[algorithm]['size'] = (size / 1024).toFixed(2) + 'kb'
    summary[algorithm]['time'] = (end - start).toFixed(2) + 'ms'

    if (Object.values(summary).every(algo => Boolean(algo['size']))) {
      console.table(summary)
    }
  })

  return monitor
}

inputStream
  .pipe(monitor('Gzip'))
  .pipe(createGzip())
  .pipe(benchmark('Gzip'))
  .pipe(createWriteStream(`${filename}.gzip`))
inputStream
  .pipe(monitor('Deflate'))
  .pipe(createDeflate())
  .pipe(benchmark('Deflate'))
  .pipe(createWriteStream(`${filename}.deflate`))
inputStream
  .pipe(monitor('Brotli'))
  .pipe(createBrotliCompress())
  .pipe(benchmark('Brotli'))
  .pipe(createWriteStream(`${filename}.brotli`))
