import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import { ParallelTransform } from './parallel-transform.js'
import parallelTransform from 'parallel-transform'

const myParallelTransform = new ParallelTransform(16, async (url, done) => {
  if (!url) return done()
  try {
    await checkUrl(url)
    done(null, `${url} is up ✅\n`)
  } catch {
    done(null, `${url} is down ❌\n`)
  }
})

const pkgParallelTransform = parallelTransform(16, async (url, done) => {
  if (!url) return done()
  try {
    await checkUrl(url)
    done(null, `${url} is up ✅\n`)
  } catch {
    done(null, `${url} is down ❌\n`)
  }
})

const start = performance.now()

pipeline(
  createReadStream(process.argv[2]),
  split(),
  myParallelTransform,
  // pkgParallelTransform,
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

async function checkUrl(url: string) {
  const timeout = 5 * 1000
  return fetch(url, {
    signal: AbortSignal.timeout(timeout)
  }).then(response => {
    if (response.ok) {
      return response
    } else {
      throw new Error('Invalid request')
    }
  })
}
