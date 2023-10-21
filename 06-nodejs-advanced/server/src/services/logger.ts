import { createLogger, transports, format } from "winston";
import dotenv from "dotenv";

dotenv.config();

const LOG_FILE_PATH = process.env.LOG_FILE_PATH || "logs";

const { combine, timestamp, printf, json, errors, colorize } = format;

const logFormat = printf(({ level, stack, message, timestamp, ...rest }) => {
  return `${timestamp} | ${level}: ${stack || message} ${JSON.stringify(rest)}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  // defaultMeta: { service: "user-service" }, // add service name
  transports: [
    new transports.File({
      filename: `${LOG_FILE_PATH}/error.log`,
      level: "error",
    }),
    new transports.File({ filename: `${LOG_FILE_PATH}/combined.log` }),
  ],
});

// If we're not in production then log to the `console` with the format: `${info.level}: ${info.message} JSON.stringify({ ...rest })`
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(colorize(), logFormat),
    })
  );
}

export { logger };
