const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

// Route for handling login form submission
router.post('/login/password', passport.authenticate('local', {
    failureRedirect: '/login', // Redirect to login page if authentication fails
    failureFlash: true,
}), function(req, res) {
    // Redirect user to the intended page or homepage after successful login
    const redirectTo = req.session.returnTo || '/';
    delete req.session.returnTo; // Clear the stored redirect URL
    res.redirect(redirectTo);
});

// // Route for rendering the debug view
// router.get('/debug', function(req, res) {
//     // Pass the session data to the template
//     const sessionData = req.session;
//     const sessionId = req.sessionID;
    
//     // Render the debug view to display res.locals, isAuthenticated, and session ID
//     res.render('debug', { locals: res.locals, isAuthenticated: req.isAuthenticated(), sessionId: sessionId, sessionData: sessionData });
// });


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

// // Route for handling logout
// router.get('/logout', function(req, res) {
//     console.log('Received logout request (GET)');
//     req.logout(function(err) {
//         if (err) {
//             console.error('Logout failed:', err);
//             // Handle the error, if needed
//             return res.status(500).send('Logout failed');
//         }
//         console.log('User logged out successfully');
//         const debugData = {
//             session: req.session,
//             user: req.user,
//             message: "Logout successful"
//         };
//         res.render('debug', { data: debugData }); // Render debug.pug with debug data
//         console.log('Logout response sent');
//     });
// });



router.get('/signup', function(req, res, next) {
    res.render('signup');
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
            res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
