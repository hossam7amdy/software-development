import { createServer } from 'net'

const server = createServer(socket => {
  socket.on('data', data => {
    console.log('Client data', data.toString())
  })
})

server.listen(3000, () => {
  console.log('Server is listening on 3000')
})
