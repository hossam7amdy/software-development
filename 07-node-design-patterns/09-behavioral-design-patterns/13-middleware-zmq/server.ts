import { Reply } from 'zeromq'

import { ZmqMiddlewareManager } from './zmqMiddlewareManager.js'
import { jsonMiddleware } from './jsonMiddleware.js'
import { zlibMiddleware } from './zlibMiddleware.js'

async function main() {
  const socket = new Reply()
  await socket.bind('tcp://127.0.0.1:5000')

  const zmq = new ZmqMiddlewareManager(socket)

  zmq.use(zlibMiddleware())
  zmq.use(jsonMiddleware())
  zmq.use({
    async inbound(message) {
      console.log('Received', message)
      // @ts-ignore
      if (message.action === 'ping') {
        // @ts-ignore
        await zmq.send({ action: 'pong', echo: message.echo })
      }
      return message
    }
  })

  console.log('Server started')
}

main()
