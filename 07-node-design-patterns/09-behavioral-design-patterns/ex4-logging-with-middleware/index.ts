import { styleText } from 'util'

import { LoggerManager } from './LoggerManager.ts'
import { saveToFileMiddleware } from './saveToFileMiddleware.ts'
import { serializeMiddleware } from './serializeMiddleware.ts'

async function main() {
  const logger = new LoggerManager()

  logger.use(serializeMiddleware)
  logger.use((message: string) => styleText('blue', message))
  logger.use(console.log)
  logger.use(saveToFileMiddleware({}))

  logger.log('This is a log message')
  logger.log(new Error('This is an error message'))
}

main()
