export const jsonMiddleware = () => {
  return {
    inbound: (message: Buffer) => {
      return JSON.parse(message.toString())
    },
    outbound: (message: object) => {
      return Buffer.from(JSON.stringify(message))
    }
  }
}
