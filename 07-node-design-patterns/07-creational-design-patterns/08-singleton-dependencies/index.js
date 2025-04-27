import { join } from 'path'
import { Blog } from './blog.js'
import { writeFile } from 'fs/promises'

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog</title>
</head>
<body>
    <div id="root">
        {{content}}
    </div>
</body>
</html>`

async function main() {
  const blog = new Blog()
  await blog.initialize()
  const posts = await blog.getAllPosts()
  if (posts.length === 0) {
    console.log(
      'No post available. Run `node import-posts.js`' +
        ' to load some sample posts'
    )
  }

  const content = []
  for (const post of posts) {
    const render = `
    <div>
    <h2>${post.title}</h2>
    <p>${post.content.replace('\n', '<br/>')}</p>
    <span>Published on ${new Date(post.created_at).toLocaleString()}</span>
    </div>
    `
    content.push(render)
  }

  const filePath = join('public', 'index.html')
  await writeFile(filePath, html.replace('{{content}}', content.join('')))
}

main().catch(console.error)
