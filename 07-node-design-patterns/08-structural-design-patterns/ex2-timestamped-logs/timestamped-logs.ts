import { styleText } from 'util'

const colors = {
  log: (...args: unknown[]) => styleText('reset', args.join(' ')),
  debug: (...args: unknown[]) => styleText('cyan', args.join(' ')),
  error: (...args: unknown[]) => styleText('red', args.join(' ')),
  info: (...args: unknown[]) => styleText('blue', args.join(' '))
}

const handlers = {
  get(target: Console, property: string) {
    if (['log', 'debug', 'error', 'info'].includes(property.toString())) {
      return (...args: unknown[]) =>
        target[property](colors[property](new Date().toISOString(), ...args))
    }
    return Reflect.get(target, property)
  }
}

export const timestampedLogs = (console: Console) => {
  return new Proxy(console, handlers)
}
