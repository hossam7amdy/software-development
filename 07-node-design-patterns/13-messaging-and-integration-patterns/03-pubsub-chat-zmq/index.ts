import { createServer } from 'http'
import yargsParser from 'yargs-parser'
import { Publisher, Subscriber } from 'zeromq'
import serveHandler from 'serve-handler'
import ws, { WebSocketServer } from 'ws'

const argv = yargsParser(process.argv)

// serve static files
const server = createServer((req, res) => {
  return serveHandler(req, res, { public: 'www' })
})

let pubSocket: Publisher
async function initializeSockets() {
  pubSocket = new Publisher()
  await pubSocket.bind(`tcp://127.0.0.1:${argv.pub}`)
  pubSocket.send('hello world!')

  const subSocket = new Subscriber()
  const subPorts: number[] = [].concat(argv.sub)
  for (const port of subPorts) {
    console.log(`Subscribing to ${port}`)
    subSocket.connect(`tcp://127.0.0.1:${port}`)
  }

  subSocket.subscribe('chat')
  for await (const [msg] of subSocket) {
    console.log(`Message from another server: ${msg}`)
    broadcast(msg.toString().split(' ').slice(1).join(' '))
  }
}

initializeSockets()

const wss = new WebSocketServer({ server })
wss.on('connection', client => {
  console.log('Client connected')
  client.on('message', (msg: Buffer) => {
    console.log(`Message: ${msg.toString()}`)
    broadcast(msg.toString())
    pubSocket.send(`chat ${msg.toString()}`)
  })
})

async function broadcast(msg: string) {
  for await (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg)
    }
  }
}

server.listen(argv.http, () => {
  console.log(`Chatting listening on port: ${argv.http}`)
})
