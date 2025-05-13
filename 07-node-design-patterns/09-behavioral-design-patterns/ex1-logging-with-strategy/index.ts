import { ConsoleStrategy } from './ConsoleStrategy.ts'
import { FileStrategy } from './FileStrategy.ts'
import { Logger } from './Logger.ts'

function testConsoleStrategy() {
  console.log('=== Using ConsoleStrategy ===')
  const consoleLogger = new Logger(new ConsoleStrategy())
  consoleLogger.debug('This is a debug message')
  consoleLogger.info('This is an info message')
  consoleLogger.warn('This is a warning message')
  consoleLogger.error(new Error('This is an error message'))
}

function testFileStrategy() {
  console.log('=== Using FileStrategy ===')
  console.log('Writing logs to files...')
  const fileLogger = new Logger(new FileStrategy('./logs'))
  fileLogger.debug('Logging to a file: Debug message')
  fileLogger.info('Logging to a file: Info message')
  fileLogger.warn('Logging to a file: Warning message')
  fileLogger.error(new Error('Logging to a file: Error message'))
  console.log('=== Logs written ===')
}

async function main() {
  testConsoleStrategy()
  testFileStrategy()
}

main()
