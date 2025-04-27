class Profiler {
  #label: string
  #lastTime: any

  constructor(label: string) {
    this.#label = label
  }

  start() {
    this.#lastTime = process.hrtime()
  }

  end() {
    const diff = process.hrtime(this.#lastTime)
    console.log(
      `Timer "${this.#label}" took ${diff[0]} seconds ` +
        `and ${diff[1]} nanoseconds.`
    )
  }
}

const noopProfiler = {
  start() {},
  end() {}
}

export function createProfiler(label: string) {
  if (process.env.NODE_ENV === 'production') {
    return noopProfiler
  }
  return new Profiler(label)
}
