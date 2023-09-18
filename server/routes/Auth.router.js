var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/User.mongo');

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }).then(function (user, err) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      var hash = crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
        .toString('hex');

      if (user.password !== hash) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

var router = express.Router();

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ success: true, user: user });
    });
  })(req, res, next);
});

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ message: 'Logout successful' });
  });
});

router.get('/current-user', function (req, res) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Send the user information to the frontend
    res.json({ user: req.user });
  } else {
    // If the user is not authenticated, send an empty object or an error message
    res.json({ error: 'User not authenticated' });
  }
});

router.post('/signup', function (req, res, next) {
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512')
    .toString('hex');

  var user = new User({
    username: req.body.username,
    password: hash,
    salt: salt,
  });

  // Save the new user, callbacks dont work anymore
  user.save();

  res.status(200).json({ message: 'Signup successful' });
});

module.exports = router;
