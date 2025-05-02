import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Level } from 'level'
import { levelSubscribeProxy } from './level-subscribe.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dbPath = join(__dirname, 'db')
const db: Level<string, any> = levelSubscribeProxy(
  new Level(dbPath, { valueEncoding: 'json' })
)

// @ts-expect-error
db.subscribe({ doctype: 'tweet', language: 'en' }, (k, val) => console.log(val))

await db.put('1', {
  doctype: 'tweet',
  text: 'Hi',
  language: 'en'
})
await db.put('2', {
  doctype: 'company',
  name: 'ACME Co.'
})
