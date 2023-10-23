import {
  Pool,
  PoolConnection,
  PoolOptions,
  QueryOptions,
  ResultSetHeader,
  RowDataPacket,
  createPool,
} from "mysql2/promise";

import { logger } from "./winston-logger";

/** A wrapper class for the MySQL2 library. */
class MySQL {
  private conn: Pool;
  private credentials: PoolOptions;

  constructor(credentials: PoolOptions) {
    this.credentials = credentials;
    this.conn = createPool(this.credentials);
  }

  /** Expose the Pool Connection */
  async connection(): Promise<PoolConnection> {
    await this.ensureConnection();
    return this.conn.getConnection();
  }

  /** For `SELECT` and `SHOW` */
  async queryRows<T>(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.query<(T & RowDataPacket)[]>(queryOptions);
  }

  /** For multiple `SELECT` and `SHOW` with `multipleStatements` as `true` */
  async queryRowsMultiple<T1, T2>(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.query<[(T1 & RowDataPacket)[], (T2 & RowDataPacket)[]]>(
      queryOptions
    );
  }

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  async queryRowsAsArray(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.query<[RowDataPacket[]]>(queryOptions);
  }

  /** For `INSERT`, `UPDATE`, etc. */
  async queryResult(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.query<ResultSetHeader>(queryOptions);
  }

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  async queryResults(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.query<ResultSetHeader[]>(queryOptions);
  }

  /** For `SELECT` and `SHOW` */
  async executeRows<T>(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.execute<(T & RowDataPacket)[]>(queryOptions);
  }

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  async executeRowsAsArray(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.execute<[RowDataPacket[]]>(queryOptions);
  }

  /** For `INSERT`, `UPDATE`, etc. */
  async executeResult(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.execute<ResultSetHeader>(queryOptions);
  }

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  async executeResults(queryOptions: QueryOptions) {
    await this.ensureConnection();
    return this.conn.execute<ResultSetHeader[]>(queryOptions);
  }

  private sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  /** A random method to simulate a step before to call the class methods */
  private async ensureConnection(maxRetries: number = 5) {
    if (!this.credentials) throw new Error("No credentials provided");

    if (!this.conn) this.conn = createPool(this.credentials);
    try {
      return await this.conn.execute("SELECT 1 + 1 AS solution");
    } catch (err) {
      if (err.code === "ECONNRESET" && maxRetries > 0) {
        logger.warn(
          `Connection reset. Retrying... (Remaining retries: ${maxRetries})`
        );
        await this.sleep(1000); // Add a delay between retries (e.g., 1 second)
        return await this.ensureConnection(maxRetries - 1);
      }
      throw err; // Rethrow unhandled errors
    }
  }
}

export let mysql: MySQL;

export const initDb = (credentials: PoolOptions) => {
  mysql = new MySQL(credentials);
};
