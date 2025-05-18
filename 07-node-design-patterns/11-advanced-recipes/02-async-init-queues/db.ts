import EventEmitter from 'events'

export default class DB extends EventEmitter {
  connected: boolean
  #commandsQueue: Array<() => void>
  constructor() {
    super()
    this.connected = false
    this.#commandsQueue = []
  }

  connect() {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      this.#commandsQueue.forEach(command => command())
      this.#commandsQueue = []
    }, 500)
  }

  async query(queryString: string) {
    if (!this.connected) {
      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString).then(resolve, reject)
        }
        this.#commandsQueue.push(command)
      })
    }

    console.log(`Query executed: ${queryString}`)
  }
}

export const db = new DB()
