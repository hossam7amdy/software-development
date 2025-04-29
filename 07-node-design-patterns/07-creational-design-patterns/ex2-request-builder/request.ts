import { URL } from 'url'
import https from 'https'
import http, { validateHeaderValue } from 'http'
import type { RequestOptions } from 'http'

class RequestBuilder {
  #url: URL
  #options: RequestOptions
  #body: any | null = null

  constructor(url: string, method: string = 'GET') {
    this.#url = new URL(url)
    this.#options = { headers: {} }
    this.#options.method = method
    this.#options.timeout = 30000 // Default timeout: 30s
  }

  setHeader(name: string, value: string) {
    validateHeaderValue(name, value)
    this.#options.headers![name] = value
    return this
  }

  setQuery(key: string, value: string) {
    this.#url.searchParams.append(key, value)
    return this
  }

  setBody(body: any) {
    this.#body = body
    return this
  }

  setTimeout(ms: number) {
    this.#options.timeout = ms
    return this
  }

  invoke(): Promise<Response> {
    this.#options.host = this.#url.host
    this.#options.port = this.#url.port
    this.#options.hostname = this.#url.hostname
    this.#options.path = this.#url.pathname + this.#url.search
    this.#options.port ??= this.#options.protocol === 'https' ? 443 : 80

    let bodyData: string | undefined
    if (this.#body) {
      bodyData = JSON.stringify(this.#body)
      this.#options.headers!['content-length'] =
        Buffer.byteLength(bodyData).toString()
      this.#options.headers!['content-type'] = 'application/json'
    }

    return new Promise((resolve, reject) => {
      // Choose http or https module based on protocol
      const requester = this.#options.protocol === 'https:' ? https : http

      const req = requester.request(this.#options, res => {
        const chunks: Buffer[] = []
        res.on('data', chunk => {
          chunks.push(Buffer.from(chunk))
        })
        res.on('error', err => {
          reject(err)
        })
        res.on('end', () => {
          const bodyBuffer = Buffer.concat(chunks)

          const headers = new Headers()
          Object.entries(res.headers).forEach(([key, value]) => {
            if (typeof value === 'string') {
              headers.append(key, value)
            } else if (Array.isArray(value)) {
              value.forEach(v => headers.append(key, v))
            }
          })

          const response = new Response(bodyBuffer, {
            headers,
            status: res.statusCode || 200,
            statusText: res.statusMessage || ''
          })

          resolve(response)
        })
      })

      // Set timeout
      req.setTimeout(this.#options.timeout!, () => {
        req.destroy()
        reject(new Error(`Request timeout after ${this.#options.timeout}ms`))
      })

      // Handle request errors
      req.on('error', err => {
        reject(err)
      })

      // Send body data if available
      if (bodyData) {
        req.write(bodyData)
      }

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
