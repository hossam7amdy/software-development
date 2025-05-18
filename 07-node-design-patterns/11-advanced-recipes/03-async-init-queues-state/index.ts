import { db } from './db.ts'

db.connect()

let count = 1

async function query() {
  await db.query(`INSERT (${count++}) INTO "LastAccesses"`)
}

for (let i = 0; i < 11; i++) {
  query()
}
