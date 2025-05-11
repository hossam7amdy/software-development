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

  async *[Symbol.asyncIterator]() {
    for (const url of this.urls) {
      yield await this._checkUrl(url)
    }
  }
}
