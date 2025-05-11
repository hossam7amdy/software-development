import { Readable } from 'stream'
import { Matrix } from './matrix.ts'

const matrix2x2 = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])

const it = matrix2x2[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.return())
console.log(it.next())

for (const value of matrix2x2) {
  console.log(value)
}

const [oneOne, oneTwo, twoOne, twoTwo] = matrix2x2
console.log(oneOne, oneTwo, twoOne, twoTwo)

const stream = Readable.from(matrix2x2)
stream.on('data', chunk => {
  console.log('chunk', chunk)
})
