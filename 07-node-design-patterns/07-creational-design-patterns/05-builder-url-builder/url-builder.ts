import { URL } from './url.js'

export class UrlBuilder {
  public protocol: string
  public username: string | null = null
  public password: string | null = null
  public hostname: string
  public port: number | null = null
  public pathname: string | null = null
  public search: string | string[] | null = null
  public hash: string | null = null

  setProtocol(protocol: string) {
    this.protocol = protocol
    return this
  }

  setAuthentication(username: string, password: string) {
    if (!username || !password) {
      throw new Error('Must specify both username and password')
    }
    this.username = username
    this.password = password
    return this
  }

  setHostname(hostname: string) {
    this.hostname = hostname
    return this
  }

  setPort(port: number) {
    if (!parseInt(port + '') || port <= 0) {
      throw new Error('Port must be a positive integer')
    }
    this.port = port
    return this
  }

  setPathname(pathname: string) {
    this.pathname = pathname
    return this
  }

  setSearch(search: string | string[]) {
    this.search = search
    return this
  }

  setHash(hash: string) {
    this.hash = hash
    return this
  }

  build() {
    return new URL(
      this.protocol,
      this.username,
      this.password,
      this.hostname,
      this.port,
      this.pathname,
      this.search,
      this.hash
    )
  }
}
