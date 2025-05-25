import { createServer } from 'http'

// import { ComputeFarm } from './computeFarmThreads.js'
import { ComputeFarm } from './computeFarmProcesses.js'

const PORT = 3000
const HOST = 'localhost'

const server = createServer()

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')

  const method = req.method?.toLowerCase()
  const url = new URL(req.url!, `http://${HOST}`)

  if (method !== 'post' || url.pathname !== '/execute') {
    return res.writeHead(200).end('Server is running 🚀\n')
  }

  // Collect request body properly
  const chunks: any[] = []
  let totalLength = 0

  req.on('data', chunk => {
    chunks.push(chunk)
    totalLength += chunk.length
  })

  req.on('end', async () => {
    try {
      const body = Buffer.concat(chunks, totalLength).toString()
      const { code, args = [] } = JSON.parse(body)

      // Validate input
      if (!code || typeof code !== 'string') {
        return res.writeHead(400).end('Invalid or missing code parameter')
      }

      const farm = new ComputeFarm(code, args)

      farm.on('end', result => {
        res.writeHead(200).end(`${result}`)
      })

      farm.on('error', error => {
        res.writeHead(500).end(error.message || 'Function execution failed')
      })

      await farm.start()
    } catch (parseError) {
      res.writeHead(400).end('Invalid JSON in request body')
    }
  })

  req.on('error', error => {
    console.error('Request error:', error)
    res.writeHead(400).end('Request processing failed')
  })
})

server.listen(PORT, HOST, () => {
  console.log('Server started')
})
