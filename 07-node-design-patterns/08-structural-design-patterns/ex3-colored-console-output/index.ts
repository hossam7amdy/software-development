import {
  colorfulConsoleComposition,
  colorfulConsoleAugmentation,
  colorfulConsoleProxy
} from './colorful-console.js'

const testColorfulConsoleComposition = () => {
  console.log('\n========== Testing Composition =============')
  const logger = colorfulConsoleComposition(console)

  logger.red('Composition:', 'red')
  logger.yellow('Composition:', 'yellow')
  logger.green('Composition:', 'green')
  logger.log('Composition (normal):', 'log')
}

const testColorfulConsoleAugmentation = () => {
  console.log('\n========== Testing Augmentation =============')
  const logger = colorfulConsoleAugmentation(console)

  logger.red('Augmentation:', 'red')
  logger.yellow('Augmentation:', 'yellow')
  logger.green('Augmentation:', 'green')
  logger.log('Augmentation (normal):', 'log')
}

const testTimestampedLogsProxy = () => {
  console.log('\n========== Testing Proxy =============')
  const logger = colorfulConsoleProxy(console)

  logger.red('Proxy:', 'red')
  logger.yellow('Proxy:', 'yellow')
  logger.green('Proxy:', 'green')
  logger.log('Proxy (normal):', 'log')
}

testColorfulConsoleComposition()
testColorfulConsoleAugmentation()
testTimestampedLogsProxy()
