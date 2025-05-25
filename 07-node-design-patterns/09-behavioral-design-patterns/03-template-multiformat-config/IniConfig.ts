import ini from 'ini'
import { Config } from './Config.js'

export class IniConfig extends Config {
  _serialize(data: Record<string, any>): string {
    return ini.stringify(data)
  }
  _deserialize(data: string): Record<string, any> {
    return ini.parse(data)
  }
}
