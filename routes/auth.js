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
        res.render("index", {
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


// // Route for rendering the debug view
// router.get('/debug', function(req, res) {
//     // Pass the session data to the template
//     const sessionData = req.session;
//     const sessionId = req.sessionID;
    
//     // Render the debug view to display res.locals, isAuthenticated, and session ID
//     res.render('debug', { locals: res.locals, isAuthenticated: req.isAuthenticated(), sessionId: sessionId, sessionData: sessionData });
// });

// Route for logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

// Route for rendering the sign-up page
router.get('/signup', function(req, res, next) {
    req.session.returnTo = req.originalUrl;
    res.render('signup', { message: req.flash('error'), user: req.user });
    
});

router.post('/signup', async function(req, res, next) {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await new Promise((resolve, reject) => {
            crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, derivedKey) => {
                if (err) return reject(err);
                resolve(derivedKey.toString('base64'));
            });
        });
        const newUser = new User({
            username: req.body.username,
            hashed_password: hashedPassword,
            salt: salt
        });
        await newUser.save();
        req.login(newUser, function(err) {
            if (err) { return next(err); }
            if (req.isAuthenticated()) {
                res.render('index', { user: req.user }); // Render welcome page if user is authenticated
            } else {
                res.redirect('/'); // Redirect to homepage if authentication fails
            }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
