import { Request } from 'zeromq'

import { ZmqMiddlewareManager } from './zmqMiddlewareManager.js'
import { jsonMiddleware } from './jsonMiddleware.js'
import { zlibMiddleware } from './zlibMiddleware.js'

async function main() {
  const socket = new Request()
  socket.connect('tcp://127.0.0.1:5000')

  const zmq = new ZmqMiddlewareManager(socket)

  zmq.use(zlibMiddleware())
  zmq.use(jsonMiddleware())
  zmq.use({
    async inbound(message) {
      console.log('Echoed back', message)
      return message
    }
  })

  setInterval(() => {
    zmq.send({ action: 'ping', echo: Date.now() } as any).catch(err => {
      console.error(err)
    })
  }, 1000)

  console.log('Client connected')
}

main()
