import { FailSafeSocket } from './failsafe-socket'

const failsafeSocket = new FailSafeSocket({ port: 3000 })

setInterval(() => {
  failsafeSocket.send(JSON.stringify(process.memoryUsage()))
}, 1000)
