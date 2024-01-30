const http = require("http");
const fs = require("fs");

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, this is your Node.js server!");
});

server.listen(3000);

// Blocking operation
async function block() {
  for (let i = 0; i < 100; i++) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
    console.log(`Waited ${i + 1} times`);

    // YOU CAN ONLY ADD CODE, YOU SHOULDN'T CHANGE ANYTHING
    await new Promise((r) => fs.readFile("file.txt", r)); // plugin a `macrotask`
  }
}

block();
