export const timestampedLogsComposition = (console: Console) => {
  // Keep a reference to the real console.log
  const originals = {
    log: console.log,
    debug: console.debug,
    error: console.error,
    info: console.info
  }

  // original key names
  const enhancedKeys = ['log', 'debug', 'error', 'info']

  // Create a new console-like object
  const wrappedConsole: Console = Object.create(null)

  // Copy everything else from the original console
  Object.getOwnPropertyNames(console).forEach(key => {
    if (!enhancedKeys.includes(key)) {
      Object.defineProperty(wrappedConsole, key, {
        value: console[key],
        writable: true,
        enumerable: true,
        configurable: true
      })
    }
  })

  Object.getOwnPropertyNames(console).forEach(key => {
    if (enhancedKeys.includes(key)) {
      Object.defineProperty(wrappedConsole, key, {
        configurable: true,
        enumerable: true,
        get() {
          return function (...args: unknown[]) {
            const timestamp = new Date().toISOString()
            originals[key].call(console, timestamp, ...args)
          }
        },
        set(val) {
          // Allow overwriting if needed
          Object.defineProperty(wrappedConsole, key, {
            value: val,
            writable: true,
            enumerable: true,
            configurable: true
          })
        }
      })
    }
  })

  return wrappedConsole
}

export const timestampedLogsAugmentation = (console: Console) => {
  const originalLog = console.log
  const originalDebug = console.debug
  const originalError = console.error
  const originalInfo = console.info

  console.log = (...args: unknown[]) => {
    const timestamp = new Date().toISOString()
    originalLog(timestamp, ...args)
  }
  console.debug = (...args: unknown[]) => {
    const timestamp = new Date().toISOString()
    originalDebug(timestamp, ...args)
  }
  console.error = (...args: unknown[]) => {
    const timestamp = new Date().toISOString()
    originalError(timestamp, ...args)
  }
  console.info = (...args: unknown[]) => {
    const timestamp = new Date().toISOString()
    originalInfo(timestamp, ...args)
  }

  return console
}

export const timestampedLogsProxy = (console: Console) => {
  const handlers = {
    get(target: Console, property: string) {
      if (
        ['log', 'debug', 'error', 'info'].includes(property) &&
        typeof target[property] === 'function'
      ) {
        return (...args: unknown[]) => {
          const timestamp = new Date().toISOString()
          target[property](timestamp, ...args)
        }
      }
      return Reflect.get(target, property)
    }
  }
  return new Proxy(console, handlers)
}
