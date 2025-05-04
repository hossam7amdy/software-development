import type { Console } from 'console'

interface ColorfulConsole extends Console {
  red: (...messages: unknown[]) => void
  yellow: (...messages: unknown[]) => void
  green: (...messages: unknown[]) => void
}

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m'
}

export const colorfulConsoleComposition = (
  console: Console
): ColorfulConsole => {
  const consoleColors = ['red', 'yellow', 'green']

  // Create a new console-like object
  const colorfulConsole: ColorfulConsole = Object.create(null)

  // Copy everything else from the original console
  Object.getOwnPropertyNames(console).forEach(key => {
    Object.defineProperty(colorfulConsole, key, {
      value: console[key],
      writable: true,
      enumerable: true,
      configurable: true
    })
  })

  consoleColors.forEach(color => {
    Object.defineProperty(colorfulConsole, color, {
      configurable: true,
      enumerable: true,
      get() {
        return function (...args: unknown[]) {
          colorfulConsole.log(colors[color], ...args, colors.reset)
        }
      },
      set(val) {
        // Allow overwriting if needed
        Object.defineProperty(colorfulConsole, color, {
          value: val,
          writable: true,
          enumerable: true,
          configurable: true
        })
      }
    })
  })

  return colorfulConsole
}

export const colorfulConsoleAugmentation = (
  console: Console
): ColorfulConsole => {
  const colorfulConsole = console as ColorfulConsole

  colorfulConsole.red = (...messages) => {
    console.log(colors.red, ...messages, colors.reset)
  }
  colorfulConsole.yellow = (...messages) => {
    console.log(colors.yellow, ...messages, colors.reset)
  }
  colorfulConsole.green = (...messages) => {
    console.log(colors.green, ...messages, colors.reset)
  }

  return colorfulConsole
}

export const colorfulConsoleProxy = (console: Console): ColorfulConsole => {
  const colorfulConsole = new Proxy(console, {
    get(target, property) {
      if (property === 'red') {
        return (message: unknown, ...rest: unknown[]) => {
          console.log(colors.red, message, ...rest, colors.reset)
        }
      } else if (property === 'yellow') {
        return (message: unknown, ...rest: unknown[]) => {
          console.log(colors.yellow, message, ...rest, colors.reset)
        }
      } else if (property === 'green') {
        return (message: unknown, ...rest: unknown[]) => {
          console.log(colors.green, message, ...rest, colors.reset)
        }
      }
      return Reflect.get(target, property)
    }
  })
  return colorfulConsole as ColorfulConsole
}
