// const mission = "learn";
const mission = process.argv[2];

if (mission === "learn") {
  console.log(`Let's write some Node code`);
} else {
  console.log(`Is ${mission} is more fun!`);
}
