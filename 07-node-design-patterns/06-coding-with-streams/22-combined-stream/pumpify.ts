import { pipeline, Duplex } from 'node:stream'
import { Readable, Writable, Transform, PassThrough } from 'node:stream'

type Stream = Readable | Writable | Transform | PassThrough | Duplex

/**
 * Creates a duplex stream from a series of streams.
 * The streams will be piped together and the resulting stream will behave
 * like a single stream that reads from the first stream and writes to the last.
 *
 * @param {...(Stream|Stream[])} streams - Stream instances to pipe together
 * @returns {Duplex} A duplex stream that pipes data through all provided streams
 */
export function pumpify(...streams: Stream[]): Duplex {
  // Flatten arrays if streams are passed as an array
  streams = streams.flat()
  const writable = streams[0] as Writable
  const readable = streams[streams.length - 1] as Readable

  if (streams.length === 0) {
    throw new Error('No streams provided')
  }

  if (streams.length === 1) {
    return streams[0] as Duplex
  }

  // Create a duplex stream that forwards between the first and last streams
  const combinedStream = new Duplex({
    writableObjectMode: writable.writableObjectMode,
    readableObjectMode: readable.readableObjectMode,

    // Write function forwards to the first stream
    write(chunk, encoding, callback) {
      if (writable.write(chunk, encoding) === false) {
        streams[0].once('drain', callback)
      } else {
        process.nextTick(callback)
      }
    },

    // Final write to the first stream
    final(callback) {
      writable.end()
      callback()
    },

    // Read function forwards from the last stream
    read(size) {
      // The last stream will push data when it has it
      // This implementation doesn't need to do anything here
      // as the data events will be forwarded automatically
    }
  })

  // Set up the pipeline
  pipeline(streams, err => {
    if (err) {
      combinedStream.destroy(err)
    } else {
      combinedStream.push(null) // EOF
    }
  })

  // Forward data events from the last stream to our combined stream
  readable.on('data', chunk => {
    if (!combinedStream.push(chunk)) {
      readable.pause()
    }
  })

  // Resume the last stream when combined stream is ready for more data
  combinedStream.on('resume', () => {
    readable.resume()
  })

  // Forward end event
  readable.on('end', () => {
    combinedStream.push(null)
  })

  // Forward errors from any stream in the pipeline
  for (const stream of streams) {
    stream.on('error', err => {
      combinedStream.destroy(err)
    })
  }

  // Handle destruction of the combined stream
  combinedStream.on('close', () => {
    for (const stream of streams) {
      if (typeof stream.destroy === 'function') {
        stream.destroy()
      }
    }
  })

  return combinedStream
}

export default pumpify
