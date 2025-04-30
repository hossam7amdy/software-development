class Queue<T> {
  #messages: Array<T>
  #resolvers: Array<(message: T) => void>

  constructor(executor: (enqueue: (message: T) => void) => void) {
    this.#messages = []
    this.#resolvers = []

    const enqueue = async (message: T): Promise<void> => {
      if (this.#resolvers.length > 0) {
        const resolver = this.#resolvers.shift()
        resolver(message)
      } else {
        this.#messages.push(message)
      }
    }
    executor(enqueue)
  }

  dequeue(): Promise<T> {
    if (this.#messages.length > 0) {
      return Promise.resolve(this.#messages.shift() as T)
    }

    return new Promise(resolve => {
      this.#resolvers.push(resolve)
    })
  }
}

export { Queue }
export default Queue
