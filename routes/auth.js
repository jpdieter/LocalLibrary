const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/users');
const flash = require('connect-flash');
const session = require('express-session');

// Initialize connect-flash middleware
router.use(flash());

// Middleware to log errors
router.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

router.get('/login', function(req, res, next) {
  // Render the login page and pass the flashed error message if it exists
  res.render('login', { message: req.flash('error') });
});

passport.use(new LocalStrategy(async function(username, password, done) {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    // Use the user's salt from the database
    const salt = user.salt;

    // Convert the password to a buffer
    const passwordBuffer = Buffer.from(password, 'utf-8');

    // Generate the hashed password using the input password and user's salt
    crypto.pbkdf2(passwordBuffer, salt, 310000, 32, 'sha256', function(err, derivedKey) {
      if (err) { 
        console.error(err); // Log the error
        return done(err); 
      }

      // Convert the derived key to a string
      const hashedPassword = derivedKey.toString('base64');

      // Compare the hashed password from the database with the generated hashed password
      if (hashedPassword !== user.hashed_password) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      return done(null, user);
    });
  } catch (err) {
    console.error(err); // Log the error
    return done(err);
  }
}));

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

module.exports = router;
