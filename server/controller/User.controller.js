const User = require('../models/User.mongo');

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//create a new user with username and some random password
async function createUser(req, res) {
  const user = new User({
    username: 'timmy',
    password: Math.random().toString(36).slice(-8),
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json('you done goofed');
  }
}

module.exports = {
  getAllUsers,
  createUser,
};
