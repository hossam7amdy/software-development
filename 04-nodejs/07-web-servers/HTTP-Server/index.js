const { createServer } = require("http");

// create http local server at posrt 3000
const PORT = 3001;
const server = createServer();

const friends = [
  { id: 0, name: "Nikola Tesla" },
  { id: 1, name: "Sir Issac Newton" },
  { id: 2, name: "Albert Einstein" },
];

// handle requests and responses
server.on("request", (req, res) => {
  const items = req.url.split("/");

  // send data to server
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("data", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res); // echo back the requested data

    // get data from server
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
      const friendsIdx = +items[2];
      res.end(JSON.stringify(friends[friendsIdx]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (items[1] === "messages") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li> Hello Issac! </li>");
    res.write("<li> What are your thoughts on astronomy </li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</head>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  // 127.0.0.1:3001 === localhost:3001
  console.log(`Lestining on port ${PORT}...`);
});
