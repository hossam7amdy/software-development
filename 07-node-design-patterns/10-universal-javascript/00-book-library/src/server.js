import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import htm from 'htm'
import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { StaticRouter } from 'react-router-dom'
import { App } from './frontend/App.js'
import { registerApiRoutes } from './api.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const html = htm.bind(createElement)

const template = ({ content }) => `<!DOCTYPE html>
 <html>
  <head>
    <meta charset="UTF-8">
    <title>Book Library</title>
  </head>
  <body>
    <div id="root">${content}</div>
    <script type="text/javascript" src="/public/main.js"></script>
  </body>
 </html>`

const server = fastify({ logger: true })

registerApiRoutes(server)

server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

server.get('*', async (req, reply) => {
  const location = req.originalUrl
  const staticContext = {}

  const serverApp = html`<${StaticRouter}
    location=${location}
    context=${staticContext}
  >
    <${App} />
  <//>`

  const content = renderToString(serverApp)
  const responseHtml = template({ content })

  let code = 200
  if (staticContext.statusCode) {
    code = staticContext.statusCode
  }

  reply.code(code).type('text/html').send(responseHtml)
})

const port = Number.parseInt(process.env.PORT) || 3000
const address = process.env.ADDRESS || '127.0.0.1'
server.listen({ port, host: address }, function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
