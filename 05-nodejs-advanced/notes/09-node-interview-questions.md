## 1- What is npm?

npm is a package manager for Node.js. It is used to install, update, and remove packages. It is also used to manage dependencies.

## 2- What is Node.js?

Node.js is a JavaScript runtime environment. It is used to run JavaScript code outside of the browser.

## 3- What are the two types of API functions in Node.js?

There are two types of API functions in Node.js:

1. Asynchronous functions: non-blocking functions that return a promise
2. Synchronous functions: blocking functions that return a value

## 4- What is an error-first callback?

An error-first callback is a callback that takes an error as the first argument. It is used to handle errors in asynchronous functions.

## 5- What is callback?

A callback is a function that is passed as an argument to another function. It is used to handle asynchronous functions.

## 6- What is a callback hell?

A callback hell is a situation where there are too many callbacks in a function. It is usually caused by nesting callbacks.

## 7- What are key features of Node.js?

The key features of Node.js are:

1. Asynchronous I/O
2. Event-driven programming
3. Single-threaded
4. Non-blocking I/O
5. Cross-platform

## 8- What are the core modules in Node.js?

The core modules in Node.js are:

1. fs: file system
2. http: HTTP server
3. https: HTTPS server
4. net: TCP server
5. os: operating system
6. path: file path
7. process: process
8. stream: stream
9. util: utility

## 9- What is global installation of dependencies?

Global installation of dependencies is a way to install dependencies globally. It is usually done by using the -g flag.

## 10- What is libuv?

libuv is a library that provides asynchronous I/O for Node.js. It is used to handle asynchronous functions.

## 11- What is V8 engine?

V8 engine is a JavaScript engine that is used in Google Chrome. It is used to run JavaScript code.

## 12- What is Node.js streams?

Node.js streams are a way to handle data in Node.js. They are used to handle data in chunks.

_There are four types of streams in Node.js:_

1. Readable stream: used to read data
2. Writable stream: used to write data
3. Duplex stream: used to read and write data
4. Transform stream: used to transform data

## 13- What is Node.js REPL?

Node.js REPL is a command line interface for Node.js. It is used to run JavaScript code.

## 14- What are commonly used timers in Node.js?

The commonly used timers in Node.js are:

1. setTimeout(): used to run a function after a specified time
2. setInterval(): used to run a function repeatedly after a specified time
3. setImmediate(): used to run a function immediately after the current event loop
4. process.nextTick(): used to run a function immediately after the current event loop

## 15- What is the difference between process.nextTick() and setImmediate()?

process.nextTick() executes callbacks before I/O events, potentially affecting performance if overused, while setImmediate() executes callbacks after I/O events, making it more suitable for I/O-intensive tasks without blocking I/O operations.

## 16- What is the difference between cluster and child_process modules?

The _cluster_ module is used to create child processes that share server ports, while the _child_process_ module is used to create child processes that do not share server ports.
