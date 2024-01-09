// const { request } = require("https");

// const req = request("https://www.google.com", (res) => {
//   res.on("data", (chunk) => {
//     console.log(`Data Chunk: ${chunk}`);
//   });

//   res.on("end", () => {
//     console.log("No more data");
//   });
// });

// req.end();

////////////////////////////////////////////
// Another way using (get)
const { get } = require("https");

get("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    console.log(`Data Chunk: ${chunk}`);
    console.log("---"); // How many chunks
  });

  res.on("end", () => {
    console.log("No more data");
  });
});
