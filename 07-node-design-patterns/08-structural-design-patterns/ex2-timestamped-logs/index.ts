import {
  timestampedLogsProxy,
  timestampedLogsAugmentation,
  timestampedLogsComposition
} from './timestamped-logs.js'

const testTimestampedLogsProxy = () => {
  console.log('\n========== Testing Proxy =============')
  const logger = timestampedLogsProxy(console)

  logger.log('Proxy:', 'log')
  logger.debug('Proxy:', 'debug')
  logger.error('Proxy:', 'error')
  logger.info('Proxy:', 'info')
  logger.warn('Proxy (no timestamp):', 'warn')
}

const testTimestampLogsAugmentation = () => {
  console.log('\n========== Testing Augmentation =============')
  const logger = timestampedLogsAugmentation(console)

  logger.log('Augmentation:', 'log')
  logger.debug('Augmentation:', 'debug')
  logger.error('Augmentation:', 'error')
  logger.info('Augmentation:', 'info')
  logger.warn('Augmentation (no timestamp):', 'warn')
}

const testTimestampLogsComposition = () => {
  console.log('\n========== Testing Composition =============')
  const logger = timestampedLogsComposition(console)

  logger.log('Composition:', 'log')
  logger.debug('Composition:', 'debug')
  logger.error('Composition:', 'error')
  logger.info('Composition:', 'info')
  logger.warn('Composition (no timestamp):', 'warn')
}

testTimestampLogsComposition()
testTimestampLogsAugmentation() // side effect
testTimestampedLogsProxy()
