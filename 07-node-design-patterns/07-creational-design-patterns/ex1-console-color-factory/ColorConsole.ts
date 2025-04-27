class ColorConsole {
  private readonly reset = '\x1b[0m'

  log(...args: unknown[]): void {
    console.log(this.reset, ...args)
  }
}

class RedConsole extends ColorConsole {
  private readonly red = '\x1b[31m'

  log(...args: unknown[]): void {
    console.log(this.red, ...args)
  }
}

class BlueConsole extends ColorConsole {
  private readonly red = '\x1b[34m'

  log(...args: unknown[]): void {
    console.log(this.red, ...args)
  }
}

class GreenConsole extends ColorConsole {
  private readonly red = '\x1b[32m'

  log(...args: unknown[]): void {
    console.log(this.red, ...args)
  }
}

export const createLogger = (color: string = '') => {
  if (color === 'red') {
    return new RedConsole()
  } else if (color === 'blue') {
    return new BlueConsole()
  } else if (color === 'green') {
    return new GreenConsole()
  }

  return new ColorConsole()
}
