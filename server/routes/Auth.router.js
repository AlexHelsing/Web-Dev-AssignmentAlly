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

router.post(
  '/login',
  passport.authenticate('local', {
    // redirect to dashboard or whatever route we got later on
    successReturnToOrRedirect: 'http://localhost:8080/dashboard',
    failureRedirect: '/login',
    failureMessage: true,
  })
);

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // Redirect to /login after a successful logout
    res.redirect('http://localhost:8080/');
  });
});

router.get('/current-user', function (req, res) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Send the user information to the frontend
    res.json({ user: req.user });
  } else {
    // If the user is not authenticated, send an empty object or an error message
    return res.status(401).json({ message: 'Not authorized' });
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

  // Assuming you have a save or create method for your User model
  user.save();

  // Log the user in after successful registration
  req.login(user, function (err) {
    if (err) {
      return next(err);
    }

    // Redirect to dashboard after successful login
    res.redirect('http://localhost:8080/dashboard');
  });
});

module.exports = router;
