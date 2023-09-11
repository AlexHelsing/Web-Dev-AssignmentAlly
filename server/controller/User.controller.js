const { json } = require('body-parser');
const User = require('../models/User.mongo');
const bcrypt = require("bcrypt");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUser(req, res){
  try{
    const user = await User.findOne(req.params.username);
    res.json(user);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }
}

async function deleteUser(req, res){
  try{
    const deleteUser = req.body.username;
    await User.findOneAndDelete({username: deleteUser})
    console.log("Deleted User: ")
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
}


//create a new user with username and some random password
async function registerUser(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  try {
    let hash = await bcrypt.hash(req.body.password, 10);
    user.password = hash;
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
}

async function loginUser(req, res){
  try{

  }
  catch(err){
    res.status(400).json({message: err.message})
  }
}


module.exports = {
  getAllUsers,
  registerUser,
  getUser,
  deleteUser,
};
