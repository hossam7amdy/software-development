import { createReadStream, createWriteStream } from 'fs'
import { pipeline, Transform } from 'stream'
import split from 'split'
import superagent from 'superagent'
import { ParallelStream } from './parallel-stream'

const normalStream = new Transform({
  objectMode: true,
  async write(url, _, done) {
    try {
      if (!url) return
      await superagent.head(url)
      this.push(`${url} is up\n`)
    } catch {
      this.push(`${url} is down\n`)
    } finally {
      done()
    }
  }
})

const parallelStream = new ParallelStream(async (url, push, done) => {
  try {
    if (!url) return done()
    await superagent.head(url as string)
    push(`${url} is up\n`)
  } catch {
    push(`${url} is down\n`)
  } finally {
    done()
  }
})

const start = performance.now()

pipeline(
  createReadStream(process.argv[2]),
  split(),
  // normalStream,
  parallelStream,
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
