export class URL {
  constructor(
    public protocol: string,
    public username: string | null,
    public password: string | null,
    public hostname: string,
    public port: number | null,
    public pathname: string | null,
    public search: string | string[] | null,
    public hash: string | null
  ) {
    this.validate()
  }

  validate(): void {
    if (!this.protocol || !this.hostname) {
      throw new Error('Must specify at least a protocol and a hostname')
    }
  }

  toString() {
    let url = ''
    url += `${this.protocol}://`
    if (this.username && this.password) {
      url += `${this.username}:${this.password}@`
    }
    url += this.hostname
    if (this.port) {
      url += this.port
    }
    if (this.pathname) {
      url += this.pathname
    }
    if (this.search) {
      url += `?${[this.search].flat().join('&')}`
    }
    if (this.hash) {
      url += `#${this.hash}`
    }
    return url
  }
}
