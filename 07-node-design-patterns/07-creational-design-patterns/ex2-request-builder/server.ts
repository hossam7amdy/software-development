import { createServer } from 'http'
import type { IncomingMessage, ServerResponse } from 'http'

type Request = IncomingMessage
type Response = ServerResponse<IncomingMessage> & {
  req: IncomingMessage
}

const POSTS = [
  {
    id: 'my-first-post',
    title: 'My first post',
    content: 'Hello World!\nThis is my first post',
    created_at: new Date('2020-02-03')
  },
  {
    id: 'iterator-patterns',
    title: 'Node.js iterator patterns',
    content: "Let's talk about some iterator patterns in Node.js\n\n...",
    created_at: new Date('2020-02-06')
  },
  {
    id: 'dependency-injection',
    title: 'Dependency injection in Node.js',
    content:
      'Today we will discuss about dependency injection in Node.js\n\n...',
    created_at: new Date('2020-02-29')
  }
]

const logger = (req: Request, res: Response) => {
  const { method, url } = req
  const startTime = process.hrtime()
  const timestamp = new Date().toISOString()

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime)
    const durationInMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2)
    console.log(
      `[${timestamp}] ${method} ${url} ${res.statusCode} - ${durationInMs}ms`
    )
  })
}

const json = (res: Response) => {
  res.setHeader('content-type', 'application/json')
}

const getPostHandler = (req: Request, res: Response) => {
  const postId = req.url?.split('/').at(-1) || ''
  const post = POSTS.find(p => p.id === postId)

  if (!post) {
    res.writeHead(404)
    res.end(JSON.stringify({ message: 'Post not found' }))
    return
  }

  res.writeHead(200)
  res.end(JSON.stringify(post))
}

const addNewPostHandler = (req: Request, res: Response) => {
  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    try {
      const post = JSON.parse(body)

      // Validate required fields
      if (!post.id || !post.title || !post.content) {
        res.writeHead(400)
        res.end(
          JSON.stringify({
            message: 'Missing required fields (id, title, content)'
          })
        )
        return
      }

      // Check if post with this ID already exists
      if (POSTS.find(p => p.id === post.id)) {
        res.writeHead(409)
        res.end(JSON.stringify({ message: 'Post with this ID already exists' }))
        return
      }

      // Add created_at timestamp
      post.created_at = new Date()

      // Add new post to array
      POSTS.push(post)

      res.writeHead(201)
      res.end(JSON.stringify(post))
    } catch (error) {
      res.writeHead(400)
      res.end(JSON.stringify({ message: 'Invalid JSON payload' }))
    }
  })
}

const listPostsHandler = (req: Request, res: Response) => {
  res.writeHead(200)
  res.end(JSON.stringify(POSTS))
}

const deletePostHandler = (req: Request, res: Response) => {
  const postId = req.url?.split('/').at(-1) || ''
  const postIndex = POSTS.findIndex(p => p.id === postId)

  if (postIndex === -1) {
    res.writeHead(404)
    res.end(JSON.stringify({ message: 'Post not found' }))
    return
  }

  // Remove post from array
  const deletedPost = POSTS.splice(postIndex, 1)[0]

  res.writeHead(200)
  res.end(
    JSON.stringify({ message: 'Post deleted successfully', post: deletedPost })
  )
}

const server = createServer((req, res) => {
  logger(req, res)
  json(res)

  switch (req.method) {
    case 'GET':
      if (req.url?.startsWith('/posts/')) {
        return getPostHandler(req, res)
      } else if (req.url === '/posts') {
        return listPostsHandler(req, res)
      }
      break
    case 'POST':
      if (req.url === '/posts') {
        return addNewPostHandler(req, res)
      }
      break
    case 'DELETE':
      if (req.url?.startsWith('/posts/')) {
        return deletePostHandler(req, res)
      }
      break
  }

  res.writeHead(404)
  res.end(JSON.stringify({ message: 'Not Found - Invalid route' }))
})

server.listen(3000, 'localhost', () => {
  console.log('Server is running at http://localhost:3000')
  console.log('Available endpoints:')
  console.log('  GET    /posts      - List all posts')
  console.log('  GET    /posts/:id  - Get a specific post')
  console.log('  POST   /posts      - Create a new post')
  console.log('  DELETE /posts/:id  - Delete a post')
})
