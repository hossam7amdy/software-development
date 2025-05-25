import { createReadStream } from 'fs'
import { createBrotliCompress } from 'zlib'
import { PassThrough } from 'stream'
import { basename } from 'path'
import { upload } from './upload.js'

const filepath = process.argv[2] // 1
const filename = basename(filepath)
const contentStream = new PassThrough() // 2

upload(`${filename}.br`, contentStream) // 3
  .then(response => {
    console.log(`Server response: ${response.data}`)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

createReadStream(filepath) // 4
  .pipe(createBrotliCompress())
  .pipe(contentStream)
