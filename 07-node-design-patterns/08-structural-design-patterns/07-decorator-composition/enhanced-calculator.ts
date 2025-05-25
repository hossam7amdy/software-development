import { StackCalculator } from './stack-calculator.js'

export class EnhancedCalculator {
  private readonly calculator: StackCalculator
  constructor(calculator: StackCalculator) {
    this.calculator = calculator
  }

  getValue() {
    return this.calculator.getValue()
  }

  putValue(value: number) {
    return this.calculator.putValue(value)
  }

  peekValue() {
    return this.calculator.peekValue()
  }

  multiply() {
    return this.calculator.multiply()
  }

  divide() {
    const divisor = this.calculator.peekValue()
    if (divisor === 0) {
      throw new Error('Division by 0')
    }
    return this.calculator.divide()
  }

  add() {
    const addend2 = this.calculator.getValue()
    const addend1 = this.calculator.getValue()
    const result = addend1 + addend2
    this.putValue(result)
    return result
  }
}

type IEnhancedCalculator = StackCalculator & EnhancedCalculator
export type { IEnhancedCalculator }
