import { AsyncQueue } from './AsyncQueue.js'

async function main() {
  const queue = new AsyncQueue<string>()
  queue.enqueue('A')
  queue.enqueue('B')
  const iter1 = queue[Symbol.asyncIterator]()
  const iter2 = queue[Symbol.asyncIterator]()
  console.log(await iter1.next()) // { value: "A", done: false }
  console.log(await iter2.next()) // { value: "B", done: false }

  iter1.next().then(console.log) // { value: "C", done: false }
  iter2.next().then(console.log) // { value: "D", done: false }
  queue.enqueue('C')
  queue.enqueue('D')

  iter1.next().then(console.log) // { value: undefined, done: true }
  iter2.next().then(console.log) // { value: undefined, done: true }
  queue.done()
}

main()
