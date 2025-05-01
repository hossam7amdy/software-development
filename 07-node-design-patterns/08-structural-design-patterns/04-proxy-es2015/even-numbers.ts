const evenNumber = new Proxy([], {
  get(_, index) {
    return 2 * Number(index)
  },
  has(_, index) {
    return Number(index) % 2 === 0
  }
})

// 0,2,4,6,8
for (let index = 0; index < 5; index++) {
  console.log(index + ' has', evenNumber[index])
}

console.log(1 in evenNumber) // false
console.log(2 in evenNumber) // true
console.log(3 in evenNumber) // false
