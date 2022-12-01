const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function Delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked
  }
}

/*
/// Examples: of blocking functions in node.js
  - JSON.stringify({}) ==> "{}"
  - JSON.parse("{}") ==> {}
  - [5,1,6,2,5].sort()
*/
console.log("NODE SERVER IS RUNNING...");
app.get("/", (req, res) => {
  res.send(`performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  Delay(5000); // blocking code: blocks the response 5s
  return res.send(`Tik Tac Toe! ${process.pid}`);
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const WORKERS = os.cpus().length;
  console.log(`${WORKERS} workers are ready...`);

  for (let i = 0; i < WORKERS; ++i) {
    cluster.fork();
  }
} else {
  app.listen(8000, () => {
    console.log("Worker process started.");
    console.log("Listening on port 8000...");
  });
}
