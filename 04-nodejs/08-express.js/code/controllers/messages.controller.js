// const { join } = require("path");

function getMessages(_, res) {
  res.render("messages", {
    title: "Messages to my friends!",
    friend: "Elon Musk",
  });
  // res.sendFile(join(__dirname, "..", "public", "images", "skimountain.jpg"));
}

module.exports = {
  getMessages,
};
