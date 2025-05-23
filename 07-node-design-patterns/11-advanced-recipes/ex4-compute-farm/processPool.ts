import { fork } from 'child_process'
import type { ChildProcess } from 'child_process'

export class ProcessPool {
  private pool: ChildProcess[]
  private active: ChildProcess[]
  private waiting: {
    resolve: (worker: ChildProcess) => void
    reject: (reason?: any) => void
  }[]

  constructor(
    private readonly file: string,
    private readonly maxPool: number
  ) {
    this.pool = []
    this.active = []
    this.waiting = []

    // Debug logging
    setInterval(() => {
      console.log(
        `Pool stats - Active: ${this.active.length}, Available: ${this.pool.length}, Waiting: ${this.waiting.length}`
      )
    }, 1000)
  }

  acquire(): Promise<ChildProcess> {
    return new Promise((resolve, reject) => {
      let worker: ChildProcess | undefined
      if (this.pool.length > 0) {
        worker = this.pool.pop()!
        this.active.push(worker)
        return resolve(worker)
      }

      if (this.active.length >= this.maxPool) {
        return this.waiting.push({ resolve, reject })
      }

      worker = fork(this.file)
      worker.once('message', message => {
        if (message === 'ready') {
          this.active.push(worker)
          return resolve(worker)
        }
        worker.kill()
        reject(new Error(`Improper process started`))
      })
      worker.once('exit', code => {
        console.log(`Process exited with code ${code}`)
        this.pool = this.pool.filter(w => w !== worker)
        this.active = this.active.filter(w => w !== worker)
      })
    })
  }

  release(worker: ChildProcess): void {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift()!
      return resolve(worker)
    }
    this.active = this.active.filter(w => worker !== w)
    this.pool.push(worker)
  }
}
