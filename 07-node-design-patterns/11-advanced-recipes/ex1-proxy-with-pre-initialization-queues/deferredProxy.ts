type Command = () => void

interface DeferredProxyConfig {
  initProps?: string
  initEvent?: string
  deferredMethods: string[]
}

export const createDeferredProxy = <T extends object>(
  component: T,
  options: DeferredProxyConfig
) => {
  let activated: boolean = false
  const commandsQueue: Command[] = []
  const { initProps, initEvent, deferredMethods } = options

  const onInit = () => {
    activated = true
    while (commandsQueue.length > 0) {
      const command = commandsQueue.shift()
      command && command()
    }
  }

  const handlers: ProxyHandler<T> = {
    get(target, prop, receiver) {
      if (initProps && target[initProps] === true) {
        onInit()
      } else if (!activated && deferredMethods.includes(prop.toString())) {
        return (...args: unknown[]) =>
          new Promise((resolve, reject) => {
            const cmd = () => target[prop](...args).then(resolve, reject)
            console.log('Command queued:', prop, args)
            commandsQueue.push(cmd)
          })
      }
      return Reflect.get(target, prop, receiver)
    }
  }

  if (component['once']) {
    component['once'](initEvent, onInit)
  }

  return new Proxy(component, handlers)
}
