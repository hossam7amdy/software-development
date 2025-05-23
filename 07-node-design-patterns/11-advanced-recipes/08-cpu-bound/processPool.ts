import { fork } from 'child_process'
import type { ChildProcess } from 'child_process'

export class ProcessPool {
  pool: ChildProcess[]
  active: ChildProcess[]
  waiting: {
    resolve: (value: ChildProcess) => void
    reject: (reason?: any) => void
  }[]
  constructor(
    readonly file: string,
    readonly poolMax: number
  ) {
    this.pool = []
    this.active = []
    this.waiting = []
  }

  acquire(): Promise<ChildProcess> {
    return new Promise((resolve, reject) => {
      let worker: ChildProcess
      if (this.pool.length > 0) {
        worker = this.pool.pop()!
        return resolve(worker)
      }
      if (this.active.length >= this.poolMax) {
        return this.waiting.push({ resolve, reject })
      }
      worker = fork(this.file)
      worker.once('message', message => {
        if (message === 'ready') {
          this.active.push(worker)
          return resolve(worker)
        }
        worker.kill()
        reject(new Error('Improper process started'))
      })
      worker.once('exit', code => {
        console.log(`Worked exited with code ${code}`)
        this.pool = this.pool.filter(w => w !== worker)
        this.active = this.active.filter(w => w !== worker)
      })
    })
  }

  release(worker: ChildProcess) {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.pop()!
      return resolve(worker)
    }
    this.active = this.active.filter(w => w !== worker)
    this.pool.push(worker)
  }
}
