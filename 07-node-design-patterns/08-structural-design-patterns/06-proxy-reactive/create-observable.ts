export function createObservable<T extends object>(
  target: T,
  observer: Function
) {
  const observable = new Proxy<T>(target, {
    set(obj, prop, newValue) {
      if (newValue !== obj[prop]) {
        const prev = obj[prop]
        obj[prop] = newValue
        observer({ prop, prev, curr: newValue })
      }
      return true
    }
  })

  return observable
}
