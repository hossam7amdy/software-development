const model = require("../models/friends.model");

function getFriends(_, res) {
  res.json(model);
}

function postFriend(req, res) {
  const friendName = req.body.name;
  if (!friendName) {
    return res.status(400).json({ error: "friend name doesn't exist!" });
  }

  const newFriend = {
    id: model.length,
    name: friendName,
  };

  model.push(newFriend);
  res.status(201).json(newFriend);
}

function getOneFriend(req, res) {
  const friendId = +req.params.friendId;
  const friend = model[friendId];

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "friend does not exist" });
  }
}

module.exports = {
  getFriends,
  getOneFriend,
  postFriend,
};
