import { Level } from 'level'
import amqp from 'amqplib'
import { createServer } from 'http'
import { Readable } from 'stream'
import JSONStream from 'JSONStream'

async function main() {
  const db = new Level('./msgHistory')

  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertExchange('chat', 'fanout')
  const { queue } = await channel.assertQueue('chat_history')
  await channel.bindQueue(queue, 'chat', '')

  channel.consume(queue, async msg => {
    if (msg) {
      const content = msg.content.toString()
      console.log(`Saving message: ${content}`)
      await db.put(Date.now().toString(), content)
      channel.ack(msg)
    }
  })

  const server = createServer((_req, res) => {
    res.writeHead(200)
    Readable.from(db.values()).pipe(JSONStream.stringify()).pipe(res)
  })

  server.listen(8090, () => {
    console.log(`History service is listening on port ${8090}`)
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
