import { promisify } from 'util'
import type { Database } from './db.js'

export class Blog {
  private readonly dbRun: Function
  private readonly dbAll: Function

  constructor(db: Database) {
    this.dbRun = promisify(db.run.bind(db))
    this.dbAll = promisify(db.all.bind(db))
  }

  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

    return this.dbRun(initQuery)
  }

  createPost(id: string, title: string, content: string, createdAt: Date) {
    return this.dbRun(
      'INSERT INTO posts VALUES (?, ?, ?, ?)',
      id,
      title,
      content,
      createdAt
    )
  }

  getAllPosts() {
    return this.dbAll('SELECT * FROM posts ORDER BY created_at DESC')
  }
}
