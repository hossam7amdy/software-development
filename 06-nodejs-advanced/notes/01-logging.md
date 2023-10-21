# Logging

## What is Logging?

- Recording events that happen in an application as program runs (e.g. method get called, objects are created, etc.)
- Focus on what is happening in the application
- Is tracking the flow of the application in which Class/Method is being called

## There are five categories of application logs that are commonly used:

1. Authentication and Authorization: includes things successful and failed login attempts, and any other security-related events.
2. Changes: changes to the database, or changes to the configuration of the application.
3. Availability and Uptime: when the application starts and stops, and when it is unavailable due to a crash or other error.
4. Resource Utilization: how much memory, disk space, and CPU time the application is using.
5. Threats: any attempts to hack or attack the application.

## What are components of a log message?

- Context Info (Message): what happened
- Timestamp: when the event occurred
- Log Level: how important the event is (e.g. DEBUG, INFO, WARN, ERROR, FATAL)

## Why is logging important?

1. _Diagnostics:_ Logging provides a way to track the flow of the application and discover the cause of errors, crashes, and other unexpected behavior.
2. _Auditing:_ Logging provides a way to track who did what, and when they did it.

## How to implement logging in NodeJS?

- There are many logging libraries available for Node.js, including [Winston](https://www.npmjs.com/package/winston) and [Bunyan](https://www.npmjs.com/package/bunyan).
- We will use [Winston](https://www.npmjs.com/package/winston) library for logging in NodeJS.
- [Winston](https://www.npmjs.com/package/winston) is a popular logging library for Node.js. It provides a simple API for logging messages, and supports multiple transports (e.g. console, file, database, etc.).

### Winston

1. Transports: A transport is a destination for log messages. For example, a transport could be a file, a database, or the console.
2. Formatting: Winston supports custom formatting of log messages (e.g. JSON, text, etc.).
3. Levels: Winston supports multiple levels of logging (e.g. debug, info, warn, error, etc.).

### What is a transport?

- A transport is a destination for log messages. For example, a transport could be a file, a database, or the console.

### What is wrong with console.log?

- It is not a good idea to use console.log for logging in Node.js applications because it does not provide any way to control the format of the log messages, and it does not support multiple transports.
