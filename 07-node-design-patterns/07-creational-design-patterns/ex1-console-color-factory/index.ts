import { createLogger } from './ColorConsole.js'

for (const color of ['red', 'blue', 'green', 'unknown']) {
  const logger = createLogger(color)
  logger.log(color)
}
