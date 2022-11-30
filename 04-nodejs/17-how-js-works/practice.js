// Memory Leak

// global variables
let a = 1;
let b = 2;
let c = 3;

// Event listeners
let buttonEl = document.getElementById("button");
buttonEl.addEventListener("click", onClick);

// setInterval
setInterval(() => {
  // referencing objects...
});
