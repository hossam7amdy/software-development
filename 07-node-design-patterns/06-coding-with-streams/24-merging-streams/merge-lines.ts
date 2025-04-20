import split from 'split'
import { createReadStream, createWriteStream } from 'fs'

const destination = process.argv[2]
const sources = process.argv.slice(3)

const destStream = createWriteStream(destination)

let endCount = 0
for (const source of sources) {
  const sourceStream = createReadStream(source, { highWaterMark: 16 })
  sourceStream.on('end', () => {
    if (endCount++ === sources.length) {
      destStream.end()
    }
  })

  sourceStream.pipe(split(line => line + '\n')).pipe(destStream, { end: false })
}
