import type { Message, Reply } from 'zeromq'

type MiddlewareFn = (message: Message) => Promise<Message> | Message

export class ZmqMiddlewareManager {
  inboundMiddlewares: MiddlewareFn[]
  outboundMiddlewares: MiddlewareFn[]

  constructor(private socket: Reply) {
    this.inboundMiddlewares = []
    this.outboundMiddlewares = []

    this.handleIncomingMessages().catch(console.error)
  }

  async handleIncomingMessages() {
    for await (const [message] of this.socket) {
      await this.executeMiddlewares(this.inboundMiddlewares, message).catch(
        err => {
          console.error('Error while processing the message', err)
        }
      )
    }
  }

  async send(message: Message) {
    const finalMessage = await this.executeMiddlewares(
      this.outboundMiddlewares,
      message
    )
    return this.socket.send(finalMessage)
  }

  use(middleware: { inbound?: MiddlewareFn; outbound?: MiddlewareFn }) {
    if (middleware.inbound) {
      this.inboundMiddlewares.push(middleware.inbound)
    }
    if (middleware.outbound) {
      this.outboundMiddlewares.unshift(middleware.outbound)
    }
  }

  async executeMiddlewares(
    middlewares: MiddlewareFn[],
    initialMessage: Message
  ) {
    let message: Message = initialMessage
    for await (const middlewareFunc of middlewares) {
      message = await middlewareFunc.call(this, message)
    }
    return message
  }
}
