import { EventEmitter } from 'events'

const METHODS_REQUIRING_CONNECTION = ['query']
const deactivate = Symbol('deactivate')

class InitializedState {
  constructor(readonly db: DB) {}

  async query(queryString: string) {
    console.log(`Query executed: ${queryString}`)
  }
}

class QueuingState {
  commandsQueue: Array<() => void>

  constructor(readonly db: DB) {
    this.commandsQueue = []

    METHODS_REQUIRING_CONNECTION.forEach(methodName => {
      this[methodName] = (...args: unknown[]) => {
        console.log('Command queued:', methodName, args)
        return new Promise((resolve, reject) => {
          const command = () => {
            this.db[methodName](...args).then(resolve, reject)
          }
          this.commandsQueue.push(command)
        })
      }
    })
  }

  [deactivate]() {
    this.commandsQueue.forEach(command => command())
    this.commandsQueue = []
  }
}

export default class DB extends EventEmitter {
  connected: boolean
  state: InitializedState | QueuingState

  constructor() {
    super()
    this.connected = false
    this.state = new QueuingState(this)
  }

  connect() {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      const queuingState = this.state
      this.state = new InitializedState(this)
      queuingState[deactivate] && queuingState[deactivate]()
    }, 500)
  }

  async query(queryString: string) {
    // @ts-expect-error
    return this.state.query(queryString)
  }
}

export const db = new DB()
