const User = require('../models/User.mongo');

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
    registerUser,
    loginUser,
  };