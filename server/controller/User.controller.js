const User = require('../models/User.mongo');

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
    const user = await User.findOne(req.params.username);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const deleteUser = req.body.username;
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
};
