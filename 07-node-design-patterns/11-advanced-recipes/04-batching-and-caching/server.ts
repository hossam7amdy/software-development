import { EOL } from 'os'
import { createServer } from 'http'

// import { totalSales } from './totalSales.js'
// import { totalSales } from './totalSalesBatch.js'
import { totalSales } from './totalSalesCache.js'

const port = 3000
const host = 'localhost'

const server = createServer(async (req, res) => {
  const url = new URL(req.url!, `http://${host}`)
  const product = url.searchParams.get('product')!
  console.log(`Processing query: ${url.search}`)

  const sum = await totalSales(product)

  res.writeHead(200, {
    'content-type': 'application/json'
  })
  res.write(
    JSON.stringify({
      product,
      sum: sum.toLocaleString()
    })
  )
  return res.end(EOL)
})

server.listen(port, host, () => {
  console.log('Server started')
})
