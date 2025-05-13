export class AsyncQueue<T> {
  #queue: Array<T>
  #resolvers: Array<(value: T | undefined) => void>
  #terminated: boolean

  constructor() {
    this.#queue = []
    this.#resolvers = []
    this.#terminated = false
  }

  enqueue(item: T): void {
    if (this.#terminated) {
      throw new Error('Queue is terminated.')
    }
    if (this.#resolvers.length) {
      const resolver = this.#resolvers.shift()
      resolver && resolver(item)
    } else {
      this.#queue.push(item)
    }
  }

  dequeue(): Promise<T | undefined> {
    if (this.#queue.length > 0) {
      return Promise.resolve(this.#queue.shift()!)
    } else if (this.#terminated) {
      return Promise.resolve(undefined)
    }
    return new Promise(resolve => {
      this.#resolvers.push(resolve.bind(this))
    })
  }

  done() {
    this.#terminated = true
    this.#resolvers.forEach(resolver => resolver(undefined))
    this.#resolvers = []
  }

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        const value = await this.dequeue()
        if (value === undefined && this.#terminated) {
          return { value: undefined, done: true }
        }
        return { value, done: false }
      }
    }
  }
}
