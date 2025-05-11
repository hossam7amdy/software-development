function* fruitGenerator() {
  yield 'peach'
  yield 'watermelon'
  return 'summer'
  throw 'summer'
}

const itFruit = fruitGenerator()
console.log(itFruit.next())
console.log(itFruit.next())

try {
  console.log(itFruit.next())
} catch (e) {
  console.log('Error', e)
}

console.log('=== using for...of ===')

for (const fruit of fruitGenerator()) {
  console.log(fruit)
}
