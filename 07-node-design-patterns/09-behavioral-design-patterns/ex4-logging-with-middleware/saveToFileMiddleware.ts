import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { EOL } from 'os'
import { join } from 'path'

export const saveToFileMiddleware = (message: string) => {
  const dir = 'logs'
  if (!existsSync(dir)) mkdirSync(dir)
  const path = join(dir, `all.log`)
  const stream = createWriteStream(path, {
    flags: 'a' // append mode
  })
  stream.write(message + EOL)
}
