import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'
import monitor from './monitor.js'

const filename = process.argv[2]

createReadStream(filename)
  .pipe(createGzip())
  .pipe(monitor)
  .pipe(createWriteStream(`${filename}.gz`))
