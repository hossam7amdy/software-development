import { EventEmitter } from 'events'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { ThreadPool } from './threadPool.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'workers', 'farmThreadWorker.js')
const workers = new ThreadPool(workerFile, 2)

export class ComputeFarm extends EventEmitter {
  constructor(
    readonly func: string,
    readonly args: unknown
  ) {
    super()
  }

  async start() {
    const worker = await workers.acquire()

    worker.postMessage({ code: this.func, args: this.args })

    const onMessage = (msg: any) => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        workers.release(worker)
      }

      this.emit(msg.event, msg.data)
    }

    worker.on('message', onMessage)
  }
}
