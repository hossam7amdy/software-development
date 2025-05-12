import { deflateRaw, inflateRaw } from 'zlib'
import { promisify } from 'util'

const deflateRawAsync = promisify(deflateRaw)
const inflateRawAsync = promisify(inflateRaw)

export const zlibMiddleware = () => {
  return {
    inbound: (message: Buffer) => inflateRawAsync(message),
    outbound: (message: Buffer) => deflateRawAsync(message)
  }
}
