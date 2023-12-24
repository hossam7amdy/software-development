# Error Handling

Is the process of responding to and recovering from error conditions in your program.

## Handling Exceptions

An exception is an error that occurs during the execution of a program. Exceptions are known to non-programmers as instances that do not conform to a general rule. The name "exception" in computer science has this meaning as well: It implies that the problem (the exception) doesn't occur frequently, i.e. the exception is the "exception to the rule".

## The try and Catch Block

The try and catch block in Node.js is used to handle exceptions. The try block contains the code which is under observation for exceptions. The catch block contains the remedy for the exception. The catch block is executed only when an exception occurs in the try block.

```js
try {
  // code that may throw an error
} catch (err) {
  // code to be executed if an error occurs
}
```

## Throwing Exceptions

The throw statement allows you to create a custom error. Technically you can throw an exception (throw an error). The exception can be a JavaScript String, a Number, a Boolean or an Object.

## Best Practices for Node.js Error Handling

### Types of Errors in Node.js

- **Operational Error**: These errors are caused by the external code that your application depends on. For example, a database query error is an operational error.
- **Programmer Error**: These errors are caused by the application code. For example, a function call with invalid arguments is a programmer error.

### Error Handling Mechanisms

- **Return Error Codes**: This is the most common error handling mechanism in Node.js. The caller function checks the return value and handles the error if there is one.
- **Throw Error**: This is another common error handling mechanism in Node.js. The caller function uses try/catch block to handle the error.
