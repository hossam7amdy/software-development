import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import https from "https";

import app from "./app";
import { initDb } from "./services/mysql";
import { initializeSocket } from "./services/socket";
import { getDbConfig } from "./utils/env";
import { logger } from "./services/winston-logger";

dotenv.config();

const createServer = (environment: string) => {
  const access = getDbConfig();
  initDb({ ...access, multipleStatements: true });

  if (environment === "production") {
    // Production mode: Use HTTPS
    const key = fs.readFileSync(process.env.SSL_KEY_PATH);
    const cert = fs.readFileSync(process.env.SSL_CERT_PATH);

    const credentials = { key, cert };
    return https.createServer(credentials, app);
  }

  return http.createServer(app);
};

const port = process.env.PORT;
const environment = process.env.NODE_ENV;

// use `npm run prod` to run in production mode
const server = createServer(environment);
initializeSocket(server);

server.listen(port, () => {
  logger.info("Hello again distributed logs");
  logger.error("Hello again distributed logs");
  logger.warn("Hello again distributed logs");
  logger.error(new Error("something bad happened"));

  console.log(`Server is running on ${environment} mode on port ${port}`);
});
