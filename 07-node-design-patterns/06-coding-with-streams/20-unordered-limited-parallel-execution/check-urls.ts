import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import split from 'split'
import { LimitedParallelStream } from './limited-parallel-stream.js'

const start = performance.now()

pipeline(
  createReadStream(process.argv[2]),
  split(),
  new LimitedParallelStream(5, async (url, push, done) => {
    try {
      if (!url) return done()
      const res = await fetch(url, { method: 'HEAD' })
      if (!res.ok) throw new Error('Url is down')
      push(`${url} is up\n`)
    } catch (e) {
      push(`${url} is down\n`)
    } finally {
      done()
    }
  }),
  createWriteStream('results.txt'),
  err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('All urls have been checked')

    const end = performance.now()
    console.log(`Pipeline took ${end - start} ms`)
  }
)
