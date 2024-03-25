//routes to handle login, log out and sign up
//In simpler terms, you're essentially creating a separate file to handle signin-related pages and then connecting those pages to your main application so they can be used when needed.

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');
const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
  });

  module.exports = router;