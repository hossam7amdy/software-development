import objectPath from 'object-path'
import { promises as fs } from 'fs'

interface FormatStrategy {
  serialize(data: any): any
  deserialize(data: any): any
}

export class Config {
  data: Record<string, any>
  formatStrategy: FormatStrategy

  constructor(formatStrategy: FormatStrategy) {
    this.data = {}
    this.formatStrategy = formatStrategy
  }

  get(configPath: string) {
    return objectPath.get(this.data, configPath)
  }

  set(configPath: string, value: any) {
    return objectPath.set(this.data, configPath, value)
  }

  async save(filePath: string) {
    console.log(`Serializing to ${filePath}`)
    await fs.writeFile(filePath, this.formatStrategy.serialize(this.data))
  }

  async load(filePath: string) {
    console.log(`Deserializing from ${filePath}`)
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePath, 'utf8')
    )
  }
}
