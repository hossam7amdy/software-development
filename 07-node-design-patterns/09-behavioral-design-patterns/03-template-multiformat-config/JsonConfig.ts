import { Config } from './Config'

export class JsonConfig extends Config {
  _serialize(data: Record<string, any>): string {
    return JSON.stringify(data, null, ' ')
  }
  _deserialize(data: string): Record<string, any> {
    return JSON.parse(data)
  }
}
