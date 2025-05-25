import { AsyncQueue } from './AsyncQueue.js'

async function runStressTest() {
  console.log('Starting AsyncQueue stress test...')

  // Test 1: Basic enqueue/dequeue operations
  console.log('\n--- Test 1: Basic enqueue/dequeue ---')
  const basicQueue = new AsyncQueue<number>()

  // Enqueue items
  for (let i = 0; i < 5; i++) {
    basicQueue.enqueue(i)
    console.log(`Enqueued: ${i}`)
  }

  // Dequeue items
  for (let i = 0; i < 5; i++) {
    const item = await basicQueue.dequeue()
    console.log(`Dequeued: ${item}`)
  }

  // Test 2: Async iteration
  console.log('\n--- Test 2: Async iteration ---')
  const iterationQueue = new AsyncQueue<string>()

  // Start consumer using async iteration
  const iterationPromise = (async () => {
    console.log('Starting async iteration consumer')
    let count = 0
    for await (const item of iterationQueue) {
      console.log(`Iterated item: ${item}`)
      count++
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    console.log(`Iteration complete, processed ${count} items`)
  })()

  // Produce items
  for (let i = 0; i < 10; i++) {
    iterationQueue.enqueue(`item-${i}`)
  }

  // Terminate the queue
  iterationQueue.done()
  await iterationPromise

  // Test 3: Multiple producers and consumers with delayed operations
  console.log('\n--- Test 3: Multiple producers and consumers ---')
  const concurrentQueue = new AsyncQueue<number>()

  // Create multiple consumers that dequeue before items are available
  const consumers = Array.from({ length: 5 }, (_, i) => {
    return (async () => {
      console.log(`Consumer ${i} starting`)
      const results: number[] = []

      for (let j = 0; j < 10; j++) {
        const item = await concurrentQueue.dequeue()
        if (item !== undefined) {
          results.push(item)
          console.log(`Consumer ${i} received: ${item}`)
          // Random processing delay
          await new Promise(resolve => setTimeout(resolve, Math.random() * 20))
        }
      }

      console.log(`Consumer ${i} finished, processed ${results.length} items`)
      return results
    })()
  })

  // Wait a bit before producing
  await new Promise(resolve => setTimeout(resolve, 100))

  // Create multiple producers
  const producers = Array.from({ length: 3 }, (_, i) => {
    return (async () => {
      console.log(`Producer ${i} starting`)

      for (let j = 0; j < 20; j++) {
        const value = i * 100 + j
        concurrentQueue.enqueue(value)
        console.log(`Producer ${i} enqueued: ${value}`)
        // Random production delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 30))
      }

      console.log(`Producer ${i} finished`)
    })()
  })

  // Wait for all producers to finish
  await Promise.all(producers)

  // Signal that we're done producing
  console.log('All producers done, terminating queue')
  concurrentQueue.done()

  // Wait for all consumers to finish
  const consumerResults = await Promise.all(consumers)
  console.log('All consumers done')
  console.log(
    'Items processed per consumer:',
    consumerResults.map(r => r.length)
  )
  console.log('Total items processed:', consumerResults.flat().length)

  // Test 4: Error handling - trying to enqueue after termination
  console.log('\n--- Test 4: Error handling - enqueue after termination ---')
  const terminatedQueue = new AsyncQueue<string>()
  terminatedQueue.done()

  try {
    terminatedQueue.enqueue('should fail')
    console.log('ERROR: Enqueue after termination did not throw an error')
  } catch (err) {
    console.log(
      'Successfully caught error when enqueueing to terminated queue:',
      err.message
    )
  }

  console.log('\nStress test complete!')
}

runStressTest().catch(err => {
  console.error('Stress test failed with error:', err)
})
