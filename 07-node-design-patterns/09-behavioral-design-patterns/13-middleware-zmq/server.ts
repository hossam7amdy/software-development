import { Reply } from 'zeromq'

import { ZmqMiddlewareManager } from './zmqMiddlewareManager.ts'
import { jsonMiddleware } from './jsonMiddleware.ts'
import { zlibMiddleware } from './zlibMiddleware.ts'

async function main() {
  const socket = new Reply()
  await socket.bind('tcp://127.0.0.1:5000')

  const zmq = new ZmqMiddlewareManager(socket)

  zmq.use(zlibMiddleware())
  zmq.use(jsonMiddleware())
  zmq.use({
    async inbound(message) {
      console.log('Received', message)
      if (message.action === 'ping') {
        await zmq.send({ action: 'pong', echo: message.echo })
      }
      return message
    }
  })

  console.log('Server started')
}

main()
