import { parentPort } from 'worker_threads'
import { runInContext, createContext, constants } from 'vm'

parentPort.on('message', async msg => {
  const result = runInContext(
    `(${msg.code})(${msg.args})`,
    createContext(constants.DONT_CONTEXTIFY)
  )
  parentPort.postMessage({
    event: 'end',
    data: result
  })
})
