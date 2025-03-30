# The Module System

## Question to be Answer

- Why modules are necessary and the different module systems available in Node.js
- CommonJS internals and module patterns
- ES modules (ESM) in Node.js
- Differences and interoperability between CommonJS and ESM

## Why do we need modules?

- Encapsulation (data hiding)
- Reusability
- Maintainability (separation of concerns)
- Managing dependencies

## What is the difference between a module and a module system?

A module is the actual unit of software, while a module system is the syntax and tooling that allows us to define modules.

## Module Systems in JavaScript and Node.js

- **Asynchronous Module Definition (AMD):** is a module system for the browser
- **Universal Module Definition (UMD):** is a module system that works in both the browser and Node.js
- **CommonJS:** is a module system for Node.js
- **ECMAScript Modules (ESM):** is a module system for JavaScript that is built into the language

## Module Systems Patterns

One of the bigger problems with JavaScript in the browser is the lack of
namespacing. Every script runs in the global scope; therefore, internal application
code or third-party dependencies can pollute the scope while exposing their own
pieces of functionality.

To solve this problem, developers have come up with a few patterns:

- **Revealing Module Pattern:** is a pattern that allows us to expose only the parts of the module that we want to be public
- **IIFE (Immediately Invoked Function Expression):** is a pattern that allows us to create a new scope for our code

## CommonJS Modules

CommonJS is a module system for Node.js. It is synchronous and uses the `require` and `module.exports` syntax.

How `require` functions works in Node.js:

1. Resolving: Node.js will try to find the module in the file system
2. Loading: Node.js will load the module into memory
3. Caching: Node.js will cache the module so that it doesn't have to be reloaded
4. Wrapping: Node.js will wrap the module in a function
5. Evaluating: Node.js will evaluate the

The essential concept to remember is that everything inside a module is private
unless it's assigned to the `module.exports` variable.

### module.exports vs. exports

`module.exports` is the object that's actually returned as the result of a `require` call. `exports` is a reference to `module.exports`.

```javascript
// module.js
exports = { a: 1 };
console.log;
```

```javascript
// index.js
const module = require("./module");
console.log;
```

### require function is synchronous

The `require` function is synchronous, which means that it will block the execution of the code until the module is loaded. This is necessary because the module might contain code that the rest of the application depends on.

### Resolving Algorithm

The resolving algorithm is the process that Node.js uses to find the module in the file system. It's based on the CommonJS specification and is the same algorithm that's used in the browser.

Resolving algorithm steps:

1. **File Modules:** If `modulename` starts with `/` or `./`.
2. **Core Modules:** If not prefixed with `/` or `./`, Node.js will try to find the module in the core modules.
3. **Package Modules:** If not found in the core modules, Node.js will try to find the module in the `node_modules` directory.

### Circular Dependencies

Circular dependencies occur when two or more modules depend on each other. This can cause a problem because the modules will be in a state of limbo, where they are not fully loaded. This can cause the application to crash.

## Module Definition Patterns

### 1. Named Exports

```javascript
exports.info = (message) => {
  console.log(`info: ${message}`);
};

exports.error = (message) => {
  console.log(`error: ${message}`);
};
```

Most of the Node.js core modules use this pattern.

### 2. Exporting a Function

```javascript
module.exports = (message) => {
  console.log(`info: ${message}`);
};

module.exports.error = (message) => {
  console.log(`error: ${message}`);
};
```

The main strength of this pattern is the fact that it allows you to expose only a single functionality also known as _substack pattern_. It also allows you to expose additional functionality as properties of the default export.

### 3. Exporting a Class

```javascript
class Logger {
  info(message) {
    console.log(`info: ${message}`);
  }

  error(message) {
    console.log(`error: ${message}`);
  }
}

module.exports = Logger;
```

It allows much more power when it comes to extending its functionality.

### 4. Exporting an Instance

```javascript
class Logger {
  info(message) {
    console.log(`info: ${message}`);
  }

  error(message) {
    console.log(`error: ${message}`);
  }
}

module.exports = new Logger();
```

This pattern is very much like creating a singleton. However, it's not a true singleton because a module might be installed multiple times inside the dependency tree of an application.

## ECMAScript Modules (ESM)

ECMAScript Modules (ESM) is a module system for JavaScript that is built into the language. It is asynchronous and uses the `import` and `export` syntax.

1. Named Exports

```javascript
export const info = (message) => {
  console.log(`info: ${message}`);
};

export const error = (message) => {
  console.log(`error: ${message}`);
};
```

2. Default Exports

```javascript
export default (message) => {
  console.log(`info: ${message}`);
};
```

In an ES module, everything is private by default and only exported entities are
publicly accessible from other modules.

3. Mixed Exports

```javascript
export const info = (message) => {
  console.log(`info: ${message}`);
};

export default (message) => {
  console.log(`info: ${message}`);
};
```

## Module Loading in ESM

### Loading phases

ESM using recursive loading from the entry point, the interpreter
will find and follow all the import statements recursively in a depth-first fashion,
until all the necessary code is explored and then evaluated.

- **Phase 1 - Construction (or parsing):** Find all the imports and recursively
  load the content of every module from the respective file.
- **Phase 2 - Instantiation:** For every exported entity, keep a named reference in
  memory, but don't assign any value just yet. Also, references are created for
  all the import and export statements tracking the dependency relationship
  between them (linking). No JavaScript code has been executed at this stage.
- **Phase 3 - Evaluation:** Node.js finally executes the code so that all the
  previously instantiated entities can get an actual value. Now running the
  code from the entry point is possible because all the blanks have been filled.

### Read-only live bindings

In ESM, the `import` statement creates a read-only live binding to the exported entity. This means that if the exported entity changes, the imported entity will also change. But if the imported entity changes, the exported entity will not change.

### Circular dependencies resolution

ESM solved the circular dependencies problem by using a two-phase loading process. In the first phase, the interpreter will find and follow all the import statements recursively in a depth-first fashion, until all the necessary code is explored and then evaluated.

## Differences and Interoperability

1. ESM runs in strict mode by default, this means that you can't use `this` in the global scope.
2. Missing references in ESM accessing `exports` or `module` will throw a `ReferenceError`.
3. ESM is asynchronous, while CommonJS is synchronous.
4. Interoperability between CommonJS and ESM is possible, but it's not straightforward. You can't use `require` in ESM, and you can't use `import` in CommonJS.
