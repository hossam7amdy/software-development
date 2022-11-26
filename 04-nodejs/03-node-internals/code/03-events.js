// Observer Pattern
const EventEmitter = require("events");

// new event
const celebrity = new EventEmitter();

// Subscribe to celebrity for Observer 1
celebrity.on("race", function (result) {
  if (result === "win") {
    console.log("Congratulation you are the best!");
  }
});

// Subscribe to celebrity for Observer 2
celebrity.on("race", function (result) {
  if (result === "win") {
    console.log("Boo I could have better than that!");
  }
});

// after code exit
process.on("exit", function (code) {
  console.log("Process exit event with code: ", code);
});

celebrity.emit("race", "win");
