export class CheckUrls {
  constructor(private urls: string[]) {}

  async _checkUrl(url: string): Promise<string> {
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        signal: AbortSignal.timeout(1000)
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return `${url} is up, status: ${res.status}`
    } catch (e) {
      return `${url} is down, error: ${e.message}`
    }
  }

  [Symbol.asyncIterator]() {
    const urlsIterator = this.urls[Symbol.iterator]()

    return {
      next: async () => {
        const nextUrl = urlsIterator.next()

        if (nextUrl.done) {
          return { done: true }
        }

        const status = await this._checkUrl(nextUrl.value)
        return { value: status, done: false }
      }
    }
  }
}
