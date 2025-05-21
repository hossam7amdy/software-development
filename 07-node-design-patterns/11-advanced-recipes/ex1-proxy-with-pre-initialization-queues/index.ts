import { createDeferredProxy } from './deferredProxy.ts'
import { db } from './db.ts'

const proxiedDb = createDeferredProxy(db, {
  deferredMethods: ['query'],
  initProps: 'connected'
})

proxiedDb.connect()

console.log(proxiedDb.connected)

let count = 1

async function query() {
  await proxiedDb.query(`INSERT (${count++}) INTO "LastAccesses"`)
}

query()
query()
setTimeout(() => {
  query()
  console.log(proxiedDb.connected)
}, 1000)
