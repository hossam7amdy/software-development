import sqlite3 from 'sqlite3'
import type { Database } from 'sqlite3'

let db: Database | null = null
export function createDb(filename: string) {
  if (db === null) {
    db = new sqlite3.Database(filename)
  }
  return db
}

export type { Database }
