import { FileLogger } from './FileLogger.ts'
import { ConsoleLogger } from './ConsoleLogger.ts'

function testConsoleStrategy() {
  console.log('=== Using ConsoleLogger ===')
  const consoleLogger = new ConsoleLogger()
  consoleLogger.debug('This is a debug message')
  consoleLogger.info('This is an info message')
  consoleLogger.warn('This is a warning message')
  consoleLogger.error(new Error('This is an error message'))
}

function testFileStrategy() {
  console.log('=== Using FileLogger ===')
  console.log('Writing logs to files...')
  const fileLogger = new FileLogger('./logs')
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
