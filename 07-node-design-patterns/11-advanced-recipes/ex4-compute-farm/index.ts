const code = `
function fib(n) {
  if(n <= 2) return n
  // console.log(\`Computing fib(\${n})\`)
  return fib(n - 1) + fib(n - 2)
}
`

async function computeFib(n: number) {
  const response = await fetch('http://localhost:3000/execute', {
    method: 'POST',
    body: JSON.stringify({ code, args: [n] })
  })
  const result = await response.text()
  console.log(`fib(${n}) = ${result}`)
}

let executing = true
const start = performance.now()
Promise.allSettled([
  computeFib(45),
  computeFib(45),
  computeFib(45),
  computeFib(45),
  computeFib(45),
  computeFib(45),
  computeFib(45),
  computeFib(45)
])
  .catch(e => {
    console.error('Error ❌', e)
    process.exit(1)
  })
  .finally(() => {
    executing = false
    const end = performance.now()
    console.log(`Total execution time: ${end - start}ms`)
  })

async function ping() {
  const response = await fetch('http://localhost:3000/ping')
  const result = await response.text()
  console.log(result)

  if (executing) setTimeout(ping, 500)
}
ping()
