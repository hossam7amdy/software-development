import { connect } from 'net'
import { fork } from 'child_process'
import type { Readable, Writable } from 'stream'

const multiplexChannels = (sources: Readable[], destinations: Writable) => {
  let openChannels = sources.length
  for (let i = 0; i < sources.length; i++) {
    sources[i].on('readable', () => {
      let chunk: Buffer
      while ((chunk = sources[i].read()) !== null) {
        const outBuff = Buffer.alloc(1 + 4 + chunk.length)
        outBuff.writeUInt8(i, 0)
        outBuff.writeUInt32BE(chunk.length, 1)
        chunk.copy(outBuff, 5)
        console.log(`Sending packet to channel: ${i}`)
        destinations.write(outBuff)
      }
    })
    sources[i].on('end', () => {
      if (--openChannels === 0) {
        destinations.end()
      }
    })
  }
}

const socket = connect({ port: 3000 }, () => {
  const child = fork(process.argv[2], process.argv.slice(3), {
    silent: true
  })

  multiplexChannels([child.stdout, child.stderr], socket)
})
