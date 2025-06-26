import { createServer } from 'http'
import serveHandler from 'serve-handler'
import ws, { WebSocketServer } from 'ws'
import amqp from 'amqplib'
import { Readable } from 'stream'
import JSONStream from 'JSONStream'

const httpPort = process.argv[2] || 8080

async function main() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertExchange('chat', 'fanout')
  const { queue } = await channel.assertQueue(
    // (1)
    `chat_srv_${httpPort}`,
    { exclusive: true }
  )
  await channel.bindQueue(queue, 'chat', '')
  channel.consume(
    queue,
    msg => {
      if (msg) {
        // (2)
        const content = msg.content.toString()
        console.log(`From queue: ${content}`)
        broadcast(content)
      }
    },
    { noAck: true }
  )

  // serve static files
  const server = createServer((req, res) => {
    return serveHandler(req, res, { public: 'www' })
  })

  const wss = new WebSocketServer({ server })
  wss.on('connection', client => {
    console.log('Client connected')
    client.on('message', (msg: Buffer) => {
      console.log(`Message: ${msg.toString()}`)
      channel.publish('chat', '', Buffer.from(msg))
    })

    fetch('http://localhost:8090').then(response => {
      if (response.body)
        Readable.from(response.body)
          .pipe(JSONStream.parse('*'))
          .on('data', msg => {
            client.send(msg)
          })
    })
  })

  async function broadcast(msg: string) {
    for await (const client of wss.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(msg)
      }
    }
  }

  server.listen(httpPort, () => {
    console.log(`Chatting listening on port: ${httpPort}`)
  })
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
