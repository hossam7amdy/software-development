# Callback and Events

Callbacks and events are two of the most important concepts in JavaScript. They are used to handle asynchronous operations and to create scalable and maintainable applications. In this chapter, we will learn:

- **The Callback pattern**, how it works, what conventions are used in Node.js, and how to deal with its most common pitfalls
- **The Observer pattern** and how to implement it in Node.js using the EventEmitter class

## The Callback Pattern

Callbacks are functions that are invoked to propagate the result of an operation, and this is exactly what we need when dealing with asynchronous operations. In JavaScript, functions are first-class citizens, which means that they can be passed as arguments to other functions, and this is the key to the callback pattern.

### The Continuation-Passing Style (CPS)

The continuation-passing style (CPS) is a programming style that uses callbacks to propagate the result of an operation. In CPS, every function takes an extra argument, which is a callback function that will be invoked when the operation is completed.

- Sync CPS: `function add(a, b, callback) { callback(a + b); }`
- Async CPS: `function addAsync(a, b, callback) { setTimeout(() => callback(a + b), 100); }`
- Non-CPS callback: `[1, 2, 3].forEach((value) => console.log(value));`

### Unpredictable function

One of the most dangerous situations is to have an API that behaves synchronously
under certain conditions and asynchronously under others.

```javascript
import { readFile } from "fs";

const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename));
  } else {
    // asynchronous function
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}
```

**_Pattern_:** Always choose a direct style for purely synchronous functions and a CPS for purely asynchronous functions.
**_Pattern_:** Use blocking APIs sparingly and only when they don't affect the ability of the application to handle concurrent asynchronous operations.
**_Pattern_:** You can guarantee that a callback is invoked asynchronously by using `setImmediate` or `process.nextTick`.

### Node.js Callback Conventions

- callback comes last
- error comes first
- Propagate errors to the callback
- **Uncaught exceptions:** `process.on("uncaughtException", (err) => console.error(err));` to catch uncaught exceptions and unhandled exceptions. This is useful for logging and cleaning up resources before the process exits. However, it's not recommended to use this in production code.

## The Observer Pattern

### The Event Emitter

The Observer pattern defines an `object` (called subject) that can notify
a set of `observers` (or listeners) when a change in its state occurs.

### Propagating Errors

The EventEmitter treats the error event in a special way. It will
automatically throw an exception and exit from the application if
such an event is emitted and no associated listener is found. For
this reason, it is recommended to always register a listener for
the error event.

### Making any object observable

the Server object of the core HTTP module inherits from
the EventEmitter function, thus allowing it to produce events such as request (when
a new request is received), connection (when a new connection is established),
or closed (when the server socket is closed).

### EventEmitters and Memory Leaks

We can use the convenience method once(event, listener)
in place of on(event, listener) to automatically unregister
a listener after the event is received for the first time. However,
be advised that if the event we specify is never emitted, then the
listener is never released, causing a memory leak.

### Sync vs. Async Events

Most of the time, emitting events synchronously is a telltale
sign that we either don't need the EventEmitter at all or that, somewhere else, the
same observable is emitting another event asynchronously, potentially causing
a Zalgo type of situation.

**_Note_**: The emission of synchronous events can be deferred with
process.nextTick() to guarantee that they are emitted
asynchronously.

### EventEmitters vs. Callbacks

The general differentiating rule is semantic:

- callbacks should be used when a result must be returned in an asynchronous way.
- events should be used when there is a need to communicate that something has happened.

Hints to help you make a decision on which method to use:

- Callbacks have some limitations when it comes to supporting different
  types of events.
- The EventEmitter should be used when the same event can occur multiple
  times, or may not occur at all.
- An API that uses callbacks can notify only one particular callback, while
  using an EventEmitter allows us to register multiple listeners for the
  same event.

### Combining Callbacks and Events

There are some particular circumstances where the EventEmitter can be used in
conjunction with a callback. This pattern is extremely powerful as it allows us to pass
a result asynchronously using a traditional callback, and at the same time return an
EventEmitter, which can be used to provide a more detailed account on the status of
an asynchronous process.

[See (glob)](https://www.npmjs.com/package/glob)

## References

- [Garbage collection](https://javascript.info/garbage-collection)
