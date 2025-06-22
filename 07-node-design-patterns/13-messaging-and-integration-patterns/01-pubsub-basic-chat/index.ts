import ws, { type RawData, WebSocketServer } from 'ws'
import serveHandler from 'serve-handler'
import { createServer } from 'http'

const server = createServer((req, res) => {
  return serveHandler(req, res, { public: 'www' })
})

const wss = new WebSocketServer({ server })

wss.on('connection', client => {
  console.log('Client connected')
  client.on('message', msg => {
    console.log(`Message: ${msg}`)
    broadcast(msg)
  })
})

const broadcast = (msg: RawData) => {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg)
    }
  }
}

server.listen(process.argv[2] || 8080, () => {
  console.log('Server is ready.')
})
