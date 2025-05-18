import { Level } from 'level'

const db = new Level('example-db')
const salesDb = db.sublevel<string, { product: string; amount: number }>(
  'sales',
  {
    valueEncoding: 'json'
  }
)

export { db, salesDb }
