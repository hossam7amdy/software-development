import { StackCalculator } from './stack-calculator.js'

const enhancedCalculatorHandler = {
  get(calculator: StackCalculator, method: string) {
    if (method === 'add') {
      return () => {
        const addend2 = calculator.getValue()
        const addend1 = calculator.getValue()
        const result = addend1 + addend2
        calculator.putValue(result)
        return result
      }
    } else if (method === 'divide') {
      return () => {
        const divisor = calculator.peekValue()
        if (divisor === 0) {
          throw new Error('Division by 0')
        }
        return calculator.divide()
      }
    }
    return calculator[method]
  }
}

const calculator = new StackCalculator()
const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler)

console.log(enhancedCalculator instanceof StackCalculator) // true!
enhancedCalculator.putValue(4)
enhancedCalculator.putValue(3)
// @ts-expect-error
console.log(enhancedCalculator.add()) // 4+3 = 7
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.multiply()) // 7*2 = 14
// enhancedCalculator.putValue(0)
// console.log(enhancedCalculator.divide()) // 14/0 -> Error('Division by 0')
