const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

// Initialize connect-flash middleware
router.use(flash());

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, continue to the next middleware or route handler
    } else {
        // Set a flash error message
        req.flash('error', 'Please sign in to access this resource.');
        
        // Store the intended URL in the session
        req.session.returnTo = req.originalUrl;
        
        // Redirect the user to the login page
        res.redirect('/login'); // You should replace '/login' with your actual login route
    }
}

// Serialization
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .exec()
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});

// Route for rendering login page
router.get('/login', function(req, res, next) {
    // Set the intended URL in the session
    req.session.returnTo = req.originalUrl;
    res.render('login', { message: req.flash('error'), user: req.user });
});

// Local authentication strategy
passport.use(new LocalStrategy(async function(username, password, done) {
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        const salt = user.salt;
        const passwordBuffer = Buffer.from(password, 'utf-8');

        crypto.pbkdf2(passwordBuffer, salt, 310000, 32, 'sha256', function(err, derivedKey) {
            if (err) { 
                console.error(err);
                return done(err); 
            }

            const hashedPassword = derivedKey.toString('base64');

            if (hashedPassword !== user.hashed_password) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            return done(null, user);
        });
    } catch (err) {
        console.error(err);
        return done(err);
    }
}));

const asyncHandler = require('express-async-handler');

router.post('/login/password', passport.authenticate('local', {
    failureRedirect: '/login', // Redirect to login page if authentication fails
    failureFlash: true,
}), asyncHandler(async (req, res, next) => {
    // Redirect user to the intended page or homepage after successful login
    const redirectTo = req.session.returnTo || '/';
    delete req.session.returnTo; // Clear the stored redirect URL
    
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        // Get details of books, book instances, authors, and genre counts
        const [
            numBooks,
            numBookInstances,
            numAvailableBookInstances,
            numAuthors,
            numGenres,
        ] = await Promise.all([
            Book.countDocuments({}).exec(),
            BookInstance.countDocuments({}).exec(),
            BookInstance.countDocuments({ status: "Available" }).exec(),
            Author.countDocuments({}).exec(),
            Genre.countDocuments({}).exec(),
        ]);

        // Render the index page with the retrieved data
        res.render("collection", {
            title: "Local Library Home",
            user: req.user,
            book_count: numBooks,
            book_instance_count: numBookInstances,
            book_instance_available_count: numAvailableBookInstances,
            author_count: numAuthors,
            genre_count: numGenres,
        });
    } else {
        // Redirect to the intended page or homepage if the user is not authenticated
        res.redirect(redirectTo);
    }
}));

// Route for logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

// Route for serving the changepassword template
router.get('/resetpassword', isAuthenticated, function (req, res) {
    res.render('resetpassword', { user: req.user });
});



router.post('/resetpassword', isAuthenticated, function (req, res) {
    // Find the user based on the provided username
    User.findOne({ username: req.body.username })
        .then(user => {
            // If user not found, set an error flash message and render the reset password page
            if (!user) {
                req.flash('error', 'Incorrect username or password');
                return res.render('resetpassword', { user: req.user, error: req.flash('error') });
            }

            // If user is found, attempt to change the password
            return user.changePassword(req.body['current-password'], req.body['new-password'])
                .then(() => {
                    // If password change is successful, set a success flash message and render the reset password page
                    req.flash('success', 'Successfully changed password');
                    return res.render('resetpassword', { user: req.user, success: req.flash('success') });
                })
                .catch(err => {
                    // If there's an error during password change, set an error flash message and render the reset password page
                    req.flash('error', err.message || 'Failed to change password');
                    return res.render('resetpassword', { user: req.user, error: req.flash('error') });
                });
        })
        .catch(err => {
            // If there's an error finding the user, set an error flash message and render the reset password page
            req.flash('error', err.message || 'An error occurred');
            return res.render('resetpassword', { user: req.user, error: req.flash('error') });
        });
});




module.exports = router;
