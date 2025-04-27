import { createReadStream } from 'fs'
import { connect } from 'net'
import { type Readable, type Writable } from 'stream'

const filenames = process.argv.slice(2)

const mux = (destination: Writable, sources: Readable[]) => {
  const openChannels = new Set()

  for (let i = 0; i < sources.length; i++) {
    sources[i].on('readable', () => {
      if (openChannels.has(i) === false) {
        openChannels.add(i)
        const filenameBuff = Buffer.alloc(1 + 4 + filenames[i].length)
        filenameBuff.writeUInt8(i, 0)
        filenameBuff.writeUInt32BE(filenames[i].length, 1)
        filenameBuff.write(filenames[i], 5)
        destination.write(filenameBuff)
      }

      let chunk: Buffer
      while ((chunk = sources[i].read()) !== null) {
        const outBuff = Buffer.alloc(1 + 4 + chunk.length)
        outBuff.writeUInt8(i, 0)
        outBuff.writeUInt32BE(chunk.length, 1)
        chunk.copy(outBuff, 5)
        console.log(`Sending packet to channel: ${i}`)
        destination.write(outBuff)
      }
    })
    sources[i].on('end', () => {
      openChannels.delete(i)
      if (openChannels.size === 0) {
        destination.end()
      }
    })
  }
}

const socket = connect(3000, 'localhost', () => {
  mux(
    socket,
    filenames.map(filename => createReadStream(filename))
  )
})
