import { Response } from 'superagent'
import type { CBHandler, URLType } from 'superagent/types.d.ts'
import { createInMemoryCache } from './in-memory-cache.ts'

type Superagent = typeof import('superagent')

const cache = createInMemoryCache<string, Response>()

const cloneResponse = (res: Response) => {
  return {
    body: structuredClone(res.body),
    headers: structuredClone(res.headers),
    text: res.text,
    status: res.status,
    statusCode: res.statusCode,
    ok: res.ok
  } as Response
}

const handlers = {
  get(request: Superagent, method: string) {
    if (['get', 'head'].includes(method.toLowerCase())) {
      return (url: URLType, data?: unknown, callback?: CBHandler) => {
        const request_ = request(method, url)
        if (data) request_.query(data)
        if (typeof data === 'function') {
          callback = data as CBHandler
          data = null
        }

        const cacheKey = url.toString()
        const cachedResponse = cache.get(cacheKey)
        console.log(cachedResponse ? 'cache hit' : 'cache miss')

        if (cachedResponse) {
          callback && callback(null, cachedResponse)
          const promises = Promise.resolve(cachedResponse)
          return Object.assign(request_, {
            end: () => request_,
            then: promises.then.bind(promises),
            catch: promises.catch.bind(promises),
            finally: promises.finally.bind(promises)
          })
        }

        if (callback) {
          request_.end((err, res) => {
            if (!err) cache.set(cacheKey, cloneResponse(res) as Response)
            callback(err, res)
          })
        } else {
          request_.then(res => {
            cache.set(cacheKey, cloneResponse(res) as Response)
          })
        }
        return request_
      }
    }
    return Reflect.get(request, method)
  }
}

export function superagentCachePlugin(superagent: Superagent): Superagent {
  return new Proxy(superagent, handlers)
}
