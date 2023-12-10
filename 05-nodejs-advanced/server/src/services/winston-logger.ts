import { Logger, createLogger, format, transports } from "winston";
import winston from "winston/lib/winston/config";
import { getLoggerPath } from "../utils/env";

const { combine, timestamp, printf, json, errors, colorize } = format;

const loggerPath = getLoggerPath();

const formatDateTime = (date: Date): string => {
  return date.toLocaleString("en-EG");
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
    error: "red",
    debug: "blue",
    warn: "yellow",
    data: "magenta",
    info: "green",
    verbose: "cyan",
    silly: "grey",
  },
};

const logFormat = printf(({ level, stack, message, timestamp }) => {
  return `${formatDateTime(new Date(timestamp))} | ${level.toUpperCase()}: ${
    stack || message
  }`;
});

winston.addColors(config.colors);

const wLogger = (input: { logName: string; level: string }): Logger => {
  return createLogger({
    levels: config.levels,
    level: `${input.level}`,
    format: combine(timestamp(), errors({ stack: true })),

    transports: [
      new transports.Console({
        level: `${input.level}`,
        format: combine(logFormat, colorize({ all: true })),
      }),
      new transports.File({
        level: "error",
        format: json(),
        filename: `${loggerPath}/${input.logName}/${input.logName}-Error.log`,
      }),
      new transports.File({
        level: "warn",
        format: json(),
        filename: `${loggerPath}/${input.logName}/${input.logName}-Warn.log`,
      }),
      new transports.File({
        level: "info",
        format: json(),
        filename: `${loggerPath}/${input.logName}/${input.logName}-Info.log`,
      }),
      new transports.File({
        level: "silly",
        format: json(),
        filename: `${loggerPath}/${input.logName}/${input.logName}-All.log`,
      }),
    ],
  });
};

const logger = wLogger({ logName: "universal", level: "info" }); // universal logger

export { logger, wLogger };
