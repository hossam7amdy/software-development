const start = Date.now()
let count = 20
let pending = count
const interval = 200
const query = process.argv[2] ? process.argv[2] : 'product=book'

const fetchProductSum = async (query: string) => {
  const response = await fetch(`http://localhost:3000?${query}`)
  const body = await response.json()
  return { status: response.status, body }
}

function sendRequest() {
  fetchProductSum(query).then(result => {
    console.log(result.status, result.body)
    if (!--pending) {
      console.log(`All completed in: ${Date.now() - start}ms`)
    }
  })

  if (--count) {
    setTimeout(sendRequest, interval)
  }
}

sendRequest()
