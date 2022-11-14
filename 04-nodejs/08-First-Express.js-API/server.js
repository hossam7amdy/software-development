const express = require("express");
const { join } = require("path");

const friendsRouter = require("./routers/friends.router");
const messagesRouter = require("./routers/messages.router");

const app = express();

// server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

// middleware
app.use((req, _, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});
app.use(express.json());

// routers
app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

// serve static files
app.use("/site", express.static("public"));

// Handlebars
app.set("view engine", "hbs");
app.set("views", join(__dirname, "views"));
app.get("/", (_, res) => {
  res.render("index", {
    title: "My Friends are VERY clever",
    caption: "Let's go skiing",
  });
});
