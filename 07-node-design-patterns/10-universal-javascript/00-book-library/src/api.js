import { setTimeout as delay } from 'timers/promises'

import { authors } from './data/authors.js'

export function registerApiRoutes(server) {
  server.get('/api/authors', async function (req, reply) {
    await delay(500)
    return authors.map(({ id, name }) => ({ id, name }))
  })

  server.get('/api/author/:authorId', async function (req, reply) {
    await delay(750)
    const author = authors.find(({ id }) => id === req.params.authorId)
    if (!author) {
      reply.code(404)
      return { error: 'Author not found' }
    }
    return author
  })
}
