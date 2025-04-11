import axios from 'axios'
import type Stream from 'stream'

export function upload(filename: string, contentStream: Stream) {
  return axios.post('http://localhost:3000', contentStream, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'X-Filename': filename
    }
  })
}
