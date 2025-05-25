import { createServer } from 'http'

// import { SubsetSum } from './subsetSum.js'
// import { SubsetSum } from './subsetSumDefer.js'
// import { SubsetSum } from './subsetSumFork.js'
import { SubsetSum } from './subsetSumThreads.js'

const PORT = 3000
const HOST = 'localhost'

const server = createServer((req, res) => {
  const url = new URL(req.url!, `http://${HOST}`)
  if (url.pathname !== '/subsetSum') {
    res.writeHead(200, { 'content-type': 'plain/text' })
    return res.end("I'm alive!\n")
  }

  const data = JSON.parse(url.searchParams.get('data') || '[]')
  const sum = JSON.parse(url.searchParams.get('sum') || '0')
  res.writeHead(200, { 'content-type': 'plain/text' })
  const subsetSum = new SubsetSum(sum, data)
  let matches = 0
  subsetSum.on('match', match => {
    matches++
    res.write(`Match: ${JSON.stringify(match)}\n`)
  })
  subsetSum.on('end', () =>
    res.end(
      `${matches} subset found out of total ${subsetSum.totalSubsets} subsets\n`
    )
  )
  subsetSum.start()
})

server.listen(PORT, HOST, () => {
  console.log('Server started')
})
