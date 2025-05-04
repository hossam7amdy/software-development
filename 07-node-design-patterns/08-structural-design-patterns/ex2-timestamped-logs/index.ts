import {
  timestampedLogsProxy,
  timestampLogsAugmentation,
  timestampLogsComposition
} from './timestamped-logs'

const testTimestampedLogsProxy = () => {
  const logger = timestampedLogsProxy(console)

  logger.log('Proxy:', 'log')
  logger.debug('Proxy:', 'debug')
  logger.error('Proxy:', 'error')
  logger.info('Proxy:', 'info')
  logger.warn('Proxy:', 'warn')
}

const testTimestampLogsAugmentation = () => {
  const logger = timestampLogsAugmentation(console)

  logger.log('Augmentation:', 'log')
  logger.debug('Augmentation:', 'debug')
  logger.error('Augmentation:', 'error')
  logger.info('Augmentation:', 'info')
  logger.warn('Augmentation:', 'warn')
}

const testTimestampLogsComposition = () => {
  const logger = timestampLogsComposition(console)

  logger.log('Composition:', 'log')
  logger.debug('Composition:', 'debug')
  logger.error('Composition:', 'error')
  logger.info('Composition:', 'info')
  logger.warn('Composition:', 'warn')
}

testTimestampLogsComposition()
testTimestampLogsAugmentation() // side effect
testTimestampedLogsProxy()
