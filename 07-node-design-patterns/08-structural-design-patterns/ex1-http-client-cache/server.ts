import { createServer } from 'http'

const PORT = 3001

const books = [
  {
    id: '1',
    title: 'Node.js Design Patterns'
  }
]

const server = createServer((req, res) => {
  switch (req.method) {
    case 'HEAD':
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({}))
      break
    case 'GET':
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(books[0]))
      break
    case 'POST':
      res
        .writeHead(201, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({}))
      break
  }
})

server.on('request', (req, res) => {
  req.on('end', () => {
    console.log(
      `${new Date().toISOString()} [${req.method}] ${req.url} - ${res.statusCode}`
    )
  })
})

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
