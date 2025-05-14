import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { EOL } from 'os'
import { join } from 'path'

export const saveToFileMiddleware = (options?: {
  path?: string
  filename?: string
}) => {
  const path = options?.path || 'logs'
  const filename = options?.filename || 'all.logs'

  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true })
  }

  return (message: string) => {
    const stream = createWriteStream(join(path, filename), {
      flags: 'a' // append mode
    })
    stream.write(message + EOL)
  }
}
