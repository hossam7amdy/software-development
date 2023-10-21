import {
  Pool,
  PoolConnection,
  PoolOptions,
  ResultSetHeader,
  RowDataPacket,
  createPool,
} from "mysql2/promise";

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
  async executeRows<T>(sql: string, values?: any) {
    await this.ensureConnection();
    return this.conn.execute<(T & RowDataPacket)[]>(sql, values);
  }

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  async executeRowsAsArray(sql: string, values?: any) {
    await this.ensureConnection();
    return this.conn.execute<[RowDataPacket[]]>(sql, values);
  }

  /** For `INSERT`, `UPDATE`, etc. */
  async executeResult(sql: string, values?: any) {
    await this.ensureConnection();
    return this.conn.execute<ResultSetHeader>(sql, values);
  }

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  async executeResults(sql: string, values?: any) {
    await this.ensureConnection();
    return this.conn.execute<ResultSetHeader[]>(sql, values);
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
        console.log(
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
