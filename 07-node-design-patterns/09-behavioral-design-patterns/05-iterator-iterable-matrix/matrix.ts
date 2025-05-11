export class Matrix {
  constructor(readonly inMatrix: number[][]) {}

  get(row: number, col: number) {
    if (row >= this.inMatrix.length || col >= this.inMatrix.length) {
      throw RangeError('Out of range')
    }
    return this.inMatrix[row][col]
  }

  set(row: number, col: number, value: number) {
    if (row >= this.inMatrix.length || col >= this.inMatrix.length) {
      throw RangeError('Out of range')
    }
    this.inMatrix[row][col] = value
  }

  *[Symbol.iterator]() {
    for (let row = 0; row < this.inMatrix.length; row++) {
      for (let col = 0; col < this.inMatrix[row].length; col++) {
        yield this.get(row, col)
      }
    }
  }
}
