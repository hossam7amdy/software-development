import { Level } from 'level'
import { createFSAdapter, createFSAdapter2 } from './fs-adapter.js'

const fs = createFSAdapter({} as Level)
const fs2 = createFSAdapter2({} as Level)

fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
    if (err) {
      return console.error(err)
    }
    console.log(res.toString())
  })
})

// try to read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(err)
})

// fs.statSync('') // TypeError: fs.statSync is not a function
fs2.statSync('') // Error: Not implemented!
