import { dirname, join } from 'path'
import { Blog } from './blog.js'
import { createDb } from './db.js'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  const db = createDb(join(__dirname, 'data.sqlite'))
  const blog = new Blog(db)
  await blog.initialize()
  const posts = await blog.getAllPosts()
  if (posts.length === 0) {
    console.log(
      'No post available. Run `node import-posts.js`' +
        ' to load some sample posts'
    )
  }

  for (const post of posts) {
    console.log(post.title)
    console.log(post.content)
    console.log(new Date(post.created_at).toISOString())
  }
}

main().catch(console.error)
