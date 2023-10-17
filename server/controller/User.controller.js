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
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function changePassword(req, res) {
  try {
    const { id } = req.user;
    const newPassword = req.body.newPassword;

    const user = await User.findById(id);

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(newPassword, salt, 1000, 64, 'sha512')
      .toString('hex');

    user.password = hash;
    user.salt = salt;

    await user.save();

    res.status(201).json({ message: 'Successfully changed password' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const deleteUser = req.params.username;

    const user = await User.findOneAndDelete({ username: deleteUser });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Successfully deleted user' });
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
