import { StackCalculator } from './stack-calculator'

export function patchCalculator(calculator: StackCalculator) {
  calculator['add'] = () => {
    const addend2 = calculator.getValue()
    const addend1 = calculator.getValue()
    const result = addend1 + addend2
    calculator.putValue(result)
    return result
  }

  const divideOrg = calculator.divide
  calculator['divide'] = () => {
    const divisor = calculator.peekValue()
    if (divisor === 0) {
      throw new Error('Division by 0')
    }
    return divideOrg.apply(calculator)
  }

  return calculator as StackCalculator & { add: () => number }
}
