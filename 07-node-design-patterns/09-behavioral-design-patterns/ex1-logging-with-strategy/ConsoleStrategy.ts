import { stdout } from 'process'
import { styleText } from 'util'

import type { IStrategy } from './IStrategy.js'

const colorMap = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'magenta'
}

export class ConsoleStrategy implements IStrategy {
  write(level: string, message: string) {
    stdout.write(styleText(colorMap[level], message))
  }
}
