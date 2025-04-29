# HTTP Request Builder

A TypeScript implementation of the Builder Pattern for making HTTP requests in Node.js.

## Overview

This project demonstrates the Builder Pattern by creating a fluent API around Node.js's built-in HTTP/HTTPS request functionality. The `RequestBuilder` class simplifies the process of creating and sending HTTP requests while maintaining a clean and chainable interface.

## Features

- Support for all common HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD)
- Setting custom headers with validation
- Query parameter management
- Request body support with automatic JSON serialization
- Timeout configuration
- Promise-based API for modern async/await usage
- Automatic handling of HTTP and HTTPS protocols
- Clean response handling with the standard Response interface

## Installation

```bash
# Clone the repository or copy the project files
# Navigate to the project directory
cd ex2-request-builder

# Install dependencies
npm install
```

## Usage

### Basic Example

```typescript
import { request } from './request'

// Simple GET request
const response = await request.get('https://api.example.com/data').invoke()

const data = await response.json()
console.log(data)
```

### Advanced Usage

```typescript
// POST request with custom headers, body, and query parameters
const response = await request
  .post('https://api.example.com/posts')
  .setHeader('Authorization', 'Bearer token123')
  .setQuery('version', '1.0')
  .setBody({
    title: 'Hello World',
    content: 'This is a test post'
  })
  .setTimeout(5000) // 5 second timeout
  .invoke()

const result = await response.json()
```

### Available Methods

- `request.get(url)`: Create a GET request
- `request.post(url)`: Create a POST request
- `request.put(url)`: Create a PUT request
- `request.delete(url)`: Create a DELETE request
- `request.patch(url)`: Create a PATCH request
- `request.head(url)`: Create a HEAD request

### Builder Methods

- `setHeader(name, value)`: Set a request header
- `setQuery(key, value)`: Add a query parameter
- `setBody(body)`: Set the request body (automatically serialized as JSON)
- `setTimeout(ms)`: Set request timeout in milliseconds
- `invoke()`: Send the request and return a Promise that resolves to a Response

## Demo

The project includes a simple demo with a server and client:

1. Start the server:

```bash
npx tsx server.ts
```

2. In a separate terminal, run the client:

```bash
npx tsx client.ts
```

The client will run a series of tests that demonstrate different capabilities of the request builder.

## Implementation Details

The implementation uses the Builder Pattern, which:

- Separates the construction of a complex object from its representation
- Allows the same construction process to create different representations
- Provides a fluent interface for constructing objects

Key files:

- `request.ts`: The main RequestBuilder implementation
- `client.ts`: Demo client that uses the RequestBuilder
- `server.ts`: A simple HTTP server for testing the client

## Builder Pattern Benefits

The Builder Pattern provides several advantages in this context:

1. **Readability**: The code is more readable and expressive
2. **Maintainability**: Each method has a single responsibility
3. **Flexibility**: The client code can create different request configurations easily
4. **Immutability**: Each method returns `this` for chaining without modifying existing objects

## License

ISC - See package.json for details.

## Author

Hossam Hamdy
