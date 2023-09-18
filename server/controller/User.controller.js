const User = require('../models/User.mongo');
var crypto = require('crypto');

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username});
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const hash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
      .toString('hex');

    if (user.password === hash) {
      console.log("Successfully changed password");
      var salt = crypto.randomBytes(16).toString('hex');
      var newHash = crypto
        .pbkdf2Sync(newPassword, salt, 1000, 64, 'sha512')
        .toString('hex');
      user.password = newHash;
      user.salt = salt;
      user.save();
      res.status(201).json({message: "Password changed"})
    } else {
      res.status(400).json({ message: "The old password does not match, try again"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const deleteUser = req.params.username;
    await User.findOneAndDelete({ username: deleteUser });
    console.log('Deleted User: ');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  changePassword,
};
