export class StackCalculator {
  private readonly stack: number[]
  constructor() {
    this.stack = new Array()
  }

  peekValue() {
    return this.stack[this.stack.length - 1]
  }

  getValue() {
    return this.stack.pop()!
  }

  putValue(value: number) {
    this.stack.push(value)
  }

  divide() {
    const divisor = this.getValue()
    const dividend = this.getValue()
    const result = dividend / divisor
    this.putValue(result)
    return result
  }

  multiply() {
    const multiplicand = this.getValue()
    const multiplier = this.getValue()
    const result = multiplier * multiplicand
    this.putValue(result)
    return result
  }
}
