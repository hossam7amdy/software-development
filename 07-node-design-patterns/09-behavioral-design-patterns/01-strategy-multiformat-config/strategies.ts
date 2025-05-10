import ini from 'ini'

const jsonStrategy = {
  serialize: (data: any) => JSON.stringify(data, null, ' '),
  deserialize: (data: any) => JSON.parse(data)
}

const iniStrategy = {
  serialize: (data: any) => ini.stringify(data),
  deserialize: (data: any) => ini.parse(data)
}

export { jsonStrategy, iniStrategy }
