import { db } from './db.ts'

db.connect()

async function query() {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`)
}

for (let i = 0; i < 11; i++) {
  query()
}

setTimeout(() => {
  query()
}, 600)
