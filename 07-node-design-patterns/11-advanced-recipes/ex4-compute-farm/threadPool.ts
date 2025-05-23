import { Worker } from 'worker_threads'

export class ThreadPool {
  private pool: Worker[]
  private active: Worker[]
  private waiting: {
    resolve: (worker: Worker) => void
    reject: (reason?: any) => void
  }[]

  constructor(
    private readonly file: string,
    private readonly maxPool: number
  ) {
    this.pool = []
    this.active = []
    this.waiting = []
  }

  acquire(): Promise<Worker> {
    return new Promise((resolve, reject) => {
      let worker: Worker | undefined
      if (this.pool.length > 0) {
        worker = this.pool.pop()!
        this.active.push(worker)
        return resolve(worker)
      }

      if (this.active.length >= this.maxPool) {
        return this.waiting.push({ resolve, reject })
      }

      worker = new Worker(this.file)
      worker.once('online', () => {
        this.active.push(worker)
        resolve(worker)
      })
      worker.once('exit', code => {
        console.log(`Worker exited with code ${code}`)
        this.pool = this.pool.filter(w => w !== worker)
        this.active = this.active.filter(w => w !== worker)
      })
    })
  }

  release(worker: Worker): void {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift()!
      return resolve(worker)
    }
    this.active = this.active.filter(w => worker !== w)
    this.pool.push(worker)
  }
}
