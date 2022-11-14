const express = require("express");

const app = express();

function Delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked
  }
}

console.log("NODE SERVER IS RUNNING...");
app.get("/", (req, res) => {
  res.send(`performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  Delay(3000); // blocking code: blocks the response 5s
  return res.send(`Tik Tac Toe! ${process.pid}`);
});

app.listen(8000, () => {
  console.log("Listening on port 8000...");
});
