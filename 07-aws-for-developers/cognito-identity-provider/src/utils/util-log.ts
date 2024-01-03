import dotenv from 'dotenv';
import winston, { Logger, createLogger, format, transports } from 'winston';

dotenv.config();

const { combine, timestamp, printf, json, errors, colorize } = format;

const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

  return `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'magenta',
    info: 'green',
    verbose: 'cyan',
    silly: 'grey',
  },
};

const logFormat = printf(({ level, stack, message, timestamp }) => {
  return `${formatDateTime(new Date(timestamp))} | ${level.toUpperCase()}: ${stack || message}`;
});

winston.addColors(config.colors);

const createWinstonLogger = (level: string, filepath?: string): Logger => {
  return createLogger({
    levels: config.levels,
    level: `${level}`,
    format: combine(timestamp(), errors({ stack: true })),

    transports: [
      new transports.Console({
        level: `${level}`,
        format: combine(logFormat, colorize({ all: true })),
      }),
    ],
  });
};

const logger = createWinstonLogger('info');

export { logger };
