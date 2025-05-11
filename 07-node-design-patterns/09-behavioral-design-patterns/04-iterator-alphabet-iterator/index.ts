const A_CHAR_CODE = 65
const Z_CHAR_CODE = 90

function* createAlphabetIterator() {
  let currCode = A_CHAR_CODE

  while (currCode < Z_CHAR_CODE) {
    yield String.fromCharCode(currCode++)
  }
}

const iterator = createAlphabetIterator()
let iterationResult = iterator.next()
while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = iterator.next()
}
