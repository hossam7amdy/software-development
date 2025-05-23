# Exercise 1: Proxy with Pre-Initialization Queues

## Problem Description

Implement a proxy pattern to manage requests while a resource is still initializing. The proxy should queue incoming requests and execute them once the resource becomes available.

## Implementation Details

- Create a proxy that manages access to a target resource
- Implement a queue system to store requests during initialization
- Execute queued requests in order once the resource is ready
- Ensure thread-safe operation

## Goals

- Understand proxy pattern implementation
- Learn request queuing mechanisms
- Handle asynchronous initialization properly
- Manage resource states effectively

## Requirements

- Node.js environment
- Basic understanding of proxy pattern
- Knowledge of async/await and Promises

## Running the Code

```bash
node index.js
```

## Expected Output

The program should demonstrate:

1. Request queueing during initialization
2. Proper request handling after initialization
3. Error handling for failed requests

## Learning Outcomes

- Proxy pattern implementation
- Request queue management
- Asynchronous resource handling
