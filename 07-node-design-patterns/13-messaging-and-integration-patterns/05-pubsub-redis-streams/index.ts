import { createServer } from 'http'
import serveHandler from 'serve-handler'
import ws, { WebSocketServer } from 'ws'
import { createClient } from 'redis'

const PORT = +process.argv[2] || 8080
const HOST = process.argv[3] || '0.0.0.0'

const redisClient = createClient()
const redisClientXRead = createClient()
await Promise.all([redisClient.connect(), redisClientXRead.connect()])

const server = createServer((req, res) => {
  return serveHandler(req, res, { public: 'www' })
})

const wss = new WebSocketServer({ server })
wss.on('connection', async client => {
  console.log('Client connected')

  client.on('message', (msg: Buffer) => {
    console.log(`Message: ${msg}`)
    redisClient.xAdd('chat_stream', '*', { message: msg })
  })

  // Load message history
  const logs = await redisClient.xRange('chat_stream', '-', '+')
  for (const { message } of logs) {
    client.send(message.message)
  }
})

const broadcast = (msg: string) => {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(Buffer.from(msg))
    }
  }
}

let lastRecordId = '$'
const processStreamMessages = async () => {
  while (true) {
    const result: any = await redisClientXRead.xRead(
      {
        id: lastRecordId,
        key: 'chat_stream'
      },
      {
        BLOCK: 0,
        COUNT: 100
      }
    )

    if (!result) continue

    const [{ messages }] = result
    for (const { id, message } of messages) {
      console.log(`Message from stream: ${message.message}`)
      broadcast(message.message)
      lastRecordId = id
    }
  }
}

processStreamMessages().catch(err => console.error(err))

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}/`)
})
