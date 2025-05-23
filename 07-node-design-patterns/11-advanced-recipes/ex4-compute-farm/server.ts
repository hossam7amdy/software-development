import { createServer } from 'http'

import { ComputeFarm } from './computeFarmThreads.ts'
// import { ComputeFarm } from './computeFarmProcesses.ts'

const PORT = 3000
const HOST = 'localhost'

const server = createServer()

server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'plain/text' })

  const method = req.method?.toLowerCase()
  const url = new URL(req.url!, `http://${HOST}`)
  if (method !== 'post' || url.pathname !== '/execute') {
    return res.end("I'm a live 🤞\n")
  }

  const size = +(req.headers['content-length'] || '0')
  const buffer = Buffer.alloc(size)
  req.on('data', chunk => {
    buffer.write(chunk.toString())
  })
  return req.on('end', () => {
    const body = JSON.parse(buffer.toString())
    const farm = new ComputeFarm(body.code, body.args)
    farm.on('end', result => {
      res.end(result + '\n')
    })
    farm.start()
  })
})

server.listen(PORT, HOST, () => {
  console.log('Server started')
})
