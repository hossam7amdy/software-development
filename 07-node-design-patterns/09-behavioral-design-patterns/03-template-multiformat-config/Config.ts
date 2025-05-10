import { readFile, writeFile } from 'fs/promises'
import objectPath from 'object-path'

export abstract class Config {
  data: Record<string, any>

  constructor() {
    this.data = {}
  }

  get(configPath: string): void {
    return objectPath.get(this.data, configPath)
  }

  set(configPath: string, value: any) {
    return objectPath.set(this.data, configPath, value)
  }

  async load(filePath: string) {
    const data = await readFile(filePath, 'utf8')
    this.data = this._deserialize(data)
  }

  async save(filePath: string) {
    await writeFile(filePath, this._serialize(this.data), 'utf8')
  }

  abstract _serialize(data: Record<string, any>): string
  abstract _deserialize(data: string): Record<string, any>
}
