# Stream in Node.js

Stream is a collection of data that might not be available all at once and don't have to fit in memory. It's a sequence of data made available over time. It's like a river which flows continuously. Data flows through a stream. It's like a pipe where water flows through.

## Types of Streams

There are four types of streams in Node.js:

- Readable: Used for read operation.
- Writable: Used for write operation.
- Duplex: Used for both read and write operation.
- Transform: A type of duplex stream where the output is computed based on input.

_NOTE_: Difference between `Readable` and `Data` event is that `Readable` event is emitted when there is data available to read, whereas `data` event is emitted as soon as data is received.
_NOTE_: Streams can be connected together to using `pipe()` function.

## How different streams works?

- Readable streams: Emit `data` event when there is data available to read. Emit `end` event when there is no more data to read. Emit `error` event when there is any error.
- Writable streams: Emit `drain` event when the buffer is empty. Emit `finish` event when all data has been flushed to underlying system.
- Duplex streams: Emit `data`, `end` and `error` events same as readable streams. Emit `drain` and `finish` events same as writable streams.
- Transform streams: Emit `data`, `end` and `error` events same as readable streams. Emit `drain` and `finish` events same as writable streams.
