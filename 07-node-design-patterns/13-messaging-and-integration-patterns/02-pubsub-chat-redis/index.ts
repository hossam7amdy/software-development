import { createServer } from 'http'
import staticHandler from 'serve-handler'
import ws, { WebSocketServer } from 'ws'
import { createClient } from 'redis'

const redisSub = createClient()
const redisPub = createClient()

await redisSub.connect()
await redisPub.connect()

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'www' })
})
const wss = new WebSocketServer({ server })
wss.on('connection', client => {
  console.log('Client connected')
  client.on('message', (msg: Buffer) => {
    console.log(`Message: ${msg}`)
    redisPub.publish('chat_messages', msg)
  })
})
redisSub.subscribe('chat_messages', msg => {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg)
    }
  }
})

server.listen(process.argv[2] || 8080, () => {
  console.log('Chatting server is ready')
})
