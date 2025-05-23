import { parentPort } from 'worker_threads'
import { runInContext, createContext } from 'vm'

parentPort.on('message', async msg => {
  try {
    // Common globals
    const context = createContext({
      console: console, // Allow console.log for debugging
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      Promise,
      JSON,
      Math,
      Date
    })

    // Properly spread arguments and handle both sync/async functions
    const code = `
    (async () => {
      const fn = ${msg.code};
      const result = await fn(...${JSON.stringify(msg.args)});
      return result;
    })()`

    const result = await runInContext(code, context)

    parentPort.postMessage({
      event: 'end',
      data: result
    })
  } catch (e) {
    parentPort.postMessage({
      event: 'error',
      data: {
        message: error.message,
        stack: error.stack
      }
    })
  }
})

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  parentPort.postMessage({
    event: 'error',
    data: {
      message: error.message,
      stack: error.stack
    }
  })
})
