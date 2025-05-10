import { IniConfig } from './IniConfig'
import { JsonConfig } from './JsonConfig'

async function main() {
  IniConfig
  const iniConfig = new IniConfig()
  await iniConfig.load('samples/conf.ini')
  iniConfig.set('book.nodejs', 'design patterns')
  await iniConfig.save('samples/conf_mod.ini')

  const jsonConfig = new JsonConfig()
  await jsonConfig.load('samples/conf.json')
  jsonConfig.set('book.nodejs', 'design patterns')
  await jsonConfig.save('samples/conf_mod.json')
}

main()
