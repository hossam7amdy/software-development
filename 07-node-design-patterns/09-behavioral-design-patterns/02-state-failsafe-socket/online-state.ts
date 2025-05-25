import { FailSafeSocket } from './failsafe-socket.js'

export class OnlineState {
  constructor(readonly failSafeSocket: FailSafeSocket) {}

  send(data: any) {
    this.failSafeSocket.queue.push(data)
    this._safeWrite(this.failSafeSocket.queue[0])
  }

  _safeWrite(data: any) {
    this.failSafeSocket.socket?.write(data, err => {
      if (err) {
        this.failSafeSocket.changeState('offline')
        return
      }
      this.failSafeSocket.queue.shift()
    })
  }

  activate() {
    for (const data of this.failSafeSocket.queue) {
      this._safeWrite(data)
    }

    this.failSafeSocket.socket?.once('error', () => {
      this.failSafeSocket.changeState('offline')
    })
  }
}
