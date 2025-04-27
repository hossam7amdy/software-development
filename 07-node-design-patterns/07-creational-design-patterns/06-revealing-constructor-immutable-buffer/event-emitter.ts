// SOURCE: https://blog.domenic.me/the-revealing-constructor-pattern/

// event-emitter.js

// This event emitter emits events, but reserves the right to publish events to
// for its creator. It uses a WeakMap for true encapsulation.

const eesToEventMaps = new WeakMap()

export default class EventEmitter {
  constructor(publisher) {
    const eventMap = Object.create(null)
    eesToEventMaps.set(this, eventMap)

    publisher(makePublish(this))
  }

  on(eventName, handler) {
    const eventMap = eesToEventMaps.get(this)

    let handlers = eventMap[eventName]
    if (!handlers) {
      handlers = eventMap[eventName] = []
    }

    handlers.push(handler)
  }

  off(eventName, handler) {
    const eventMap = eesToEventMaps.get(this)

    const handlers = eventMap[eventName]
    if (!handlers) {
      return
    }

    const index = handlers.indexOf(handler)
    if (index === -1) {
      return
    }

    handlers.splice(index, -1)
  }
}

function makePublish(ee) {
  const eventMap = eesToEventMaps.get(ee)

  return function (eventName, ...args) {
    const handlers = eventMap[eventName]
    if (handlers) {
      handlers.forEach(h => h(...args))
    }
  }
}

// usage.js
const myEE = new EventEmitter(publish => {
  setImmediate(() => {
    publish('name', 'hossam hamdy')
  })
})

// The other code only gets access to `on` and `off`: it cannot trigger spurious
// events, but only listen for them. This makes it safe to pass `myEE` to
// multiple consumers without worrying about them accidentally stepping on each
// other's toes.

// (Of course, they could intentionally step on each other's toes, e.g. by
// overwriting `on` or `off`. For true security you'll need to deeply-freeze
// `myEE`, and do a few more things, e.g. to protect against plan interference
// attacks. We're not focused on that right now, but instead on the API
// ergonomics.)

myEE.on('name', name => {
  console.log('My name is:', name)
})
