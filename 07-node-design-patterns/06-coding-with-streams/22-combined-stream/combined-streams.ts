import { createGzip, createGunzip } from 'zlib'
import {
  type BinaryLike,
  createCipheriv,
  createDecipheriv,
  scryptSync
} from 'crypto'
import pumpify from './pumpify.js'

function createKey(password: string) {
  return scryptSync(password, 'salt', 24)
}

export function createCompressAndEncrypt(
  password: string,
  iv: BinaryLike | Buffer<ArrayBufferLike> | null
) {
  const key = createKey(password)

  const gzipStream = createGzip()
  const cipherStream = createCipheriv('aes192', key, iv)

  return pumpify(gzipStream, cipherStream)
}

export function createDecryptAndDecompress(
  password: string,
  iv: BinaryLike | null
) {
  const key = createKey(password)

  const decipherStream = createDecipheriv('aes192', key, iv)
  const gunzipStream = createGunzip()

  return pumpify(decipherStream, gunzipStream)
}
