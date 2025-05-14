type MiddlewareFunc<T = unknown> = (message: T) => any

export class LoggerManager {
  #middlewares: MiddlewareFunc[]

  constructor() {
    this.#middlewares = []
  }

  use<T>(middlewareFunc: MiddlewareFunc<T>) {
    this.#middlewares.push(middlewareFunc.bind(this))
  }

  async log<T>(initialMessage: T) {
    let message = initialMessage
    for (const middlewareFunc of this.#middlewares) {
      message = await middlewareFunc(message)
    }
    return message
  }
}
