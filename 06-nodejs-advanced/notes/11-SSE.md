# Server Send Events (SSE)

## What is SSE?

It is a technology that allows a browser to receive automatic updates from a server via HTTP connection. The Server-Sent Events EventSource API is standardized as part of HTML5 by the W3C.

### Common use cases

- Stock market updates
- News feeds
- Social media feeds
- Sport results
- Logs (e.g. server logs, client logs)
- etc.

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

## SSE vs WebSockets

differences between SSE and WebSockets:

| Differences    | SSE              | WebSockets        |
| -------------- | ---------------- | ----------------- |
| Protocol       | HTTP             | WebSocket         |
| Connection     | Client -> Server | Client <-> Server |
| Data Format    | Text             | Text or Binary    |
| Latency        | High             | Low               |
| Error Handling | Automatic        | Manual            |
| Use Cases      | One-way          | Two-way           |

## What are the main components of SSE?

- Server: The server that sends the updates to the client.
- Client: The client that receives the updates from the server.
- EventSource: The API that is used by the client to receive the updates from the server.

## How to use SSE?

### Server

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

### Client

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

## How to test SSE?

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
