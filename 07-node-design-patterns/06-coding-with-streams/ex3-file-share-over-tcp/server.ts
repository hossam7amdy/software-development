import { createWriteStream } from 'fs'
import { createServer } from 'net'
import { join } from 'path'
import { PassThrough, Readable } from 'stream'
import type { Writable } from 'stream'

const PORT = 3000

const destinations: Map<number, Writable> = new Map()

const monitor = new PassThrough()
monitor.on('data', data => {
  console.log('monitor data:', data.toString())
})

const saveFileStream = (source: Readable) => {
  let currentLength: number | null = null
  let currentChannel: number | null = null

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

    console.log(`Received packet from: ${currentChannel}`, chunk.toString())
    if (destinations.has(currentChannel) === false) {
      const filepath = join('received_files', chunk.toString())
      destinations[currentChannel] = createWriteStream(filepath)
    } else {
      destinations[currentChannel].write(chunk)
    }
    currentChannel = null
    currentLength = null
  })

  source.on('end', () => {
    for (const filename in destinations) {
      destinations[filename].end()
    }
    destinations.clear()
    console.log('Source channel closed')
  })
}

const server = createServer(socket => {
  saveFileStream(socket.pipe(monitor))
})

server.listen(PORT, 'localhost', () => {
  console.log(`TCP server listening on port ${PORT}`)
})
