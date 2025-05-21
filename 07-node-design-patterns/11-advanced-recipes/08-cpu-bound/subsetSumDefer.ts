import { EventEmitter } from 'events'

export class SubsetSum extends EventEmitter {
  totalSubsets: number
  private runningCombine: number
  constructor(
    readonly sum: number,
    readonly set: number[]
  ) {
    super()
    this.totalSubsets = 0
  }

  _combine(set: number[], subset: number[]) {
    for (let i = 0; i < set.length; i++) {
      const newSubset = subset.concat(set[i])
      this._combineInterleaved(set.slice(i + 1), newSubset)
      this._processSubset(newSubset)
    }
  }

  _combineInterleaved(set: number[], subset: number[]) {
    this.runningCombine++
    setImmediate(() => {
      this._combine(set, subset)
      if (--this.runningCombine === 0) {
        this.emit('end')
      }
    })
  }

  _processSubset(subset: number[]) {
    this.totalSubsets++
    console.log('Subset', this.totalSubsets, subset)
    const res = subset.reduce((prev, item) => prev + item, 0)
    if (res === this.sum) {
      this.emit('match', subset)
    }
  }

  start() {
    this.runningCombine = 0
    this._combineInterleaved(this.set, [])
  }
}
