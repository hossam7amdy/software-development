import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createDecryptAndDecompress } from './combined-streams.ts'

const [, , password, source, ivHex] = process.argv
const iv = Buffer.from(ivHex, 'hex')
const destination = source.replace(/\.gz\.enc$/, '')

pipeline(
  createReadStream(source),
  createDecryptAndDecompress(password, iv),
  createWriteStream(destination),
  err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`${destination} created`)
  }
)
