import { EventEmitter } from 'events'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { ProcessPool } from './processPool.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'workers', 'subsetSumProcessWorker.js')
const workers = new ProcessPool(workerFile, 2)

export class SubsetSum extends EventEmitter {
  totalSubsets: number
  constructor(
    readonly sum: number,
    readonly set: number[]
  ) {
    super()
    this.totalSubsets = 0
  }

  async start() {
    const worker = await workers.acquire()
    worker.send({ sum: this.sum, set: this.set })

    const onMessage = (msg: any) => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        workers.release(worker)
      } else if (msg.event === 'finish') {
        this.totalSubsets = msg.data
      }
      this.emit(msg.event, msg.data)
    }

    worker.on('message', onMessage)
  }
}
