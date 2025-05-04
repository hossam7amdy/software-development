import { timestampedLogs } from './timestamped-logs'

const logger = timestampedLogs(console)

logger.log('log')
logger.debug('debug')
logger.error('error')
logger.info('info')
logger.warn('warn')
logger.trace('trace')
