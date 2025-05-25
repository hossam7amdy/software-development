import type { Socket, SocketConnectOpts } from 'net'
import { OfflineState } from './offline-state.js'
import { OnlineState } from './online-state.js'

export class FailSafeSocket {
  currentState: OnlineState | OfflineState
  queue: Buffer[]
  socket: Socket | null
  connectOpts: SocketConnectOpts
  states: {
    offline: OfflineState
    online: OnlineState
  }

  constructor(connectOpts: SocketConnectOpts) {
    this.connectOpts = connectOpts
    this.queue = []
    this.socket = null
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    }
    this.changeState('offline')
  }

  changeState(state: 'offline' | 'online') {
    console.log(`Activating state: ${state}`)
    this.currentState = this.states[state]
    this.currentState.activate()
  }

  send(data: any) {
    this.currentState.send(data)
  }
}
