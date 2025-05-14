type MiddlewareFunc<T = unknown> = (message: T) => any

export class LoggerManager {
  #middlewares: MiddlewareFunc[]

  constructor() {
    this.#middlewares = []
  }

  use<T>(middlewareFunc: MiddlewareFunc<T>) {
    this.#middlewares.push(middlewareFunc.bind(this))
  }

  log<T>(message: T) {
    let finalMessages = message
    this.#middlewares.forEach(async middlewareFunc => {
      finalMessages = await middlewareFunc(finalMessages)
    })
    return finalMessages
  }
}
