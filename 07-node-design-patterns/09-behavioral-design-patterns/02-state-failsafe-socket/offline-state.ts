import { FailSafeSocket } from './failsafe-socket.js'
import { createConnection } from 'net'

export class OfflineState {
  constructor(readonly failSafeSocket: FailSafeSocket) {}

  send(data: any) {
    this.failSafeSocket.queue.push(data)
  }

  activate() {
    const retry = () => {
      setTimeout(() => this.activate(), 1000)
    }

    this.failSafeSocket.socket = createConnection(
      this.failSafeSocket.connectOpts,
      () => {
        console.log('Connection established')
        this.failSafeSocket.changeState('online')
      }
    )
    this.failSafeSocket.socket.once('error', retry)
  }
}
