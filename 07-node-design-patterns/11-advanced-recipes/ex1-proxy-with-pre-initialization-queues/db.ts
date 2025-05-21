import { EventEmitter } from 'events'

export default class DB extends EventEmitter {
  connected: boolean
  constructor() {
    super()
    this.connected = false
  }

  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
    }, 500)
  }

  async query(queryString: string) {
    setTimeout(() => {
      console.log(`Query executed: ${queryString}`)
    }, 1000)
  }
}

export const db = new DB()
