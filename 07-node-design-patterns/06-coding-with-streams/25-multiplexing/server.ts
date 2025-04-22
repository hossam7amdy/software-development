import { createServer } from 'net'
import { createWriteStream } from 'fs'
import type { Readable, Writable } from 'stream'

const demultiplexChannel = (source: Readable, destinations: Writable[]) => {
  let currentChannel: number | null = null
  let currentLength: number | null = null

  source.on('readable', () => {
    let chunk: Buffer
    if (currentChannel === null) {
      chunk = source.read(1)
      currentChannel = chunk && chunk.readUint8(0)
    }

    if (currentLength === null) {
      chunk = source.read(4)
      currentLength = chunk && chunk.readUint32BE(0)

      if (currentLength === null) {
        return null
      }
    }

    chunk = source.read(currentLength)
    if (chunk === null) {
      return null
    }

    console.log(`Received packet from: ${currentChannel}`)
    destinations[currentChannel].write(chunk)
    currentChannel = null
    currentLength = null
  })

  source.on('end', () => {
    destinations.forEach(dest => dest.end())
    console.log('Source channel closed')
  })
}

const server = createServer(socket => {
  const stdoutStream = createWriteStream('stdout.log')
  const stderrStream = createWriteStream('stderr.log')
  demultiplexChannel(socket, [stdoutStream, stderrStream])
})
server.listen(3000, () => console.log('Server started'))
