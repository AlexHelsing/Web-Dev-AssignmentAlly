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
      // No user found or password mismatch
      return res.status(400).json({
        message: info.message || 'Login failed',
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // Return success status and optionally any user details you want to share
      return res.status(200).json({
        message: 'Successfully logged in',
        user: {
          id: user.id,
          username: user.username,
        },
      });
    });
  })(req, res, next); // calling the middleware function with our Express request, response & next middleware
});

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // Redirect to /login after a successful logout
    res.status(200).json({ message: 'Successfully logged out' });
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

router.post('/', async function (req, res, next) {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
      var salt = crypto.randomBytes(16).toString('hex');
      var hash = crypto
        .pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512')
        .toString('hex');

      var user = new User({
        username: req.body.username,
        password: hash,
        salt: salt,
      });

      await user.save(); // Adding await here to ensure the user is saved before proceeding

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        // Redirect to /login after a successful registration
        res.status(200).json({ message: 'Successfully registered' });
      });
    } else {
      console.log('Username already exists');
      // Send JSON response instead of redirecting
      res
        .status(400)
        .json({ message: 'Username already exists', redirectTo: '/signup' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
