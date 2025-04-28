import { URL } from 'url'
import http, { validateHeaderValue } from 'http'
import type { RequestOptions } from 'http'

type Method = 'GET' | 'HEAD' | 'PUT' | 'DELETE' | 'POST' | 'PATCH'

class RequestBuilder {
  #options: RequestOptions
  #body: any | null = null
  #searchParams: URLSearchParams | null = null

  constructor(url: string, method: Method = 'GET') {
    this.#options = { headers: {} }
    this.#options.method = method

    const parsedUrl = new URL(url)
    this.#options.host = parsedUrl.host
    this.#options.port = parsedUrl.port
    this.#options.path = parsedUrl.pathname
    this.#options.hostname = parsedUrl.hostname
  }

  setHeader(name: string, value: string) {
    validateHeaderValue(name, value)
    this.#options.headers![name] = value
    return this
  }

  setQuery(key: string, value: string) {
    if (this.#searchParams === null) {
      this.#searchParams = new URLSearchParams()
    }
    this.#searchParams.append(key, value)
    return this
  }

  setBody(body: any) {
    this.#body = body
    return this
  }

  invoke<T extends unknown>(): Promise<T> {
    if (this.#searchParams) {
      this.#options.path += `?${this.#searchParams.toString()}`
    }
    if (this.#body) {
      this.#body = JSON.stringify(this.#body)
      this.#options.headers!['content-length'] = Buffer.byteLength(this.#body)
    }

    return new Promise((resolve, reject) => {
      const req = http.request(this.#options, res => {
        const chunks: unknown[] = []
        res.setEncoding('utf8')
        res.on('data', chunk => {
          chunks.push(chunk)
        })
        res.on('error', err => {
          reject(err)
        })
        res.on('end', () => {
          resolve(chunks.join('') as T)
        })
      })

      if (this.#body) {
        req.write(this.#body, err => {
          if (err) reject(err)
        })
      }
      req.on('error', err => {
        reject(err)
      })
      req.end()
    })
  }
}

const request = (url: string) => new RequestBuilder(url, 'GET')
request.get = (url: string) => new RequestBuilder(url, 'GET')
request.head = (url: string) => new RequestBuilder(url, 'HEAD')
request.put = (url: string) => new RequestBuilder(url, 'PUT')
request.delete = (url: string) => new RequestBuilder(url, 'DELETE')
request.post = (url: string) => new RequestBuilder(url, 'POST')
request.patch = (url: string) => new RequestBuilder(url, 'PATCH')

export { request, RequestBuilder }
export default request
