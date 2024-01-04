# Proxy Pattern

Generally speaking, a proxy means a stand-in for someone else. Instead of speaking to that person directly, you’ll speak to the proxy person who will represent the person you were trying to reach. The same happens in JavaScript: instead of interacting with the target object directly, we’ll interact with the Proxy object.

A proxy can be useful to add validation. A user shouldn’t be able to change person’s age to a string value, or give them an empty name. Or if the user is trying to access a property on the object that doesn’t exist, we should let the user know.

## Reflect

JavaScript provides a built-in object called Reflect, which makes it easier for us to manipulate the target object when working with proxies.

Instead of accessing properties through obj[prop] or setting properties through obj[prop] = value, we can access or modify properties on the target object through Reflect.get() and Reflect.set(). The methods receive the same arguments as the methods on the handler object.

## Tradeoffs

Proxies are a powerful way to add control over the behavior of an object. A proxy can have various use-cases: it can help with validation, formatting, notifications, or debugging.

Overusing the Proxy object or performing heavy operations on each handler method invocation can easily affect the performance of your application negatively. It’s best to not use proxies for performance-critical code.
