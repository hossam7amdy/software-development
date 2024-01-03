import dotenv from 'dotenv';
import http from 'http';

import { app } from './app';
import { logger } from './utils/util-log';

dotenv.config();

const { PORT, ENV } = process.env;

if (!PORT) {
  logger.error('Missing PORT environment variable');
  process.exit(1);
}

if (!ENV) {
  logger.error('Missing ENV environment variable');
  process.exit(1);
}

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is running on ${ENV} mode on port ${PORT}`);
});
