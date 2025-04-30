import { createServer } from 'http'
import { setTimeout as wait } from 'timers/promises'
import Queue from './queue.ts'

const queue = new Queue(enqueue => {
  enqueue('Task1')
  enqueue('Task2')
  enqueue('Task3')

  const server = createServer((req, res) => {
    res.writeHead(201, { 'content-type': 'plain/text' })
    if (req.method !== 'POST') {
      return res.end('Only POST requests can enqueue new messages!\n')
    }
    let message = ''
    req.on('data', chunk => {
      message += chunk
    })
    req.on('end', () => {
      enqueue(message)
      res.end('Message enqueued successfully.\n')
    })
  })

  const port = 3000
  server.listen(port, async () => {
    console.log(`Server listening on ${port}`)
    console.log('Waiting for messages...')

    while (true) {
      const message = await queue.dequeue()
      await wait(500) // simulate queue processing
      console.log(`Dequeued message "${message}"`)
    }
  })
})
