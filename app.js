const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); //Used to parse the cookie header and populate req.cookies (essentially provides a convenient method for accessing cookie information).
const logger = require('morgan');
require('dotenv').config()
const compression = require("compression");
const helmet = require("helmet");
const LocalStrategy = require('passport-local');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//These modules/files contain code for handling particular sets of related "routes" (URL paths). 
const indexRouter = require('./routes/index');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site
const authRouter = require('./routes/auth');
const collectionRouter = require('./routes/collection');
const searchRouter = require('./routes/search');
const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 40,
  validate: {xForwardedForHeader: false},
});
// Apply rate limiter to all requests
app.use(limiter);

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
  console.log("You successfully connected to MongoDB!");
}

// view engine setup
app.set('views', path.join(__dirname, 'views')); //folder where templates will be stored
app.set('view engine', 'pug'); //template library

//middleware libraries
app.use(logger('dev'));
app.use(express.json()); //populate req.body with form fields
app.use(express.urlencoded({ extended: false })); ////populate req.body with form fields
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(express.static(path.join(__dirname, 'public'))); //serve all static files in the /public directory

// Ensure that process.env.SECRET_KEY is set and use it as the secret
const secretKey = process.env.SECRET_KEY; 

// Add session middleware before any route handlers
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
    store: MongoStore.create({ 
        mongoUrl: process.env.DATABASE_URL,
        ttl: 24 * 60 * 60
    })
}));

// Initialize Passport and add passport.initialize() middleware
app.use(passport.initialize());

// Use passport.session() middleware to enable persistent login sessions
app.use(passport.session());

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net", "stackpath.bootstrapcdn.com"],
      // Add other directives as necessary
    },
  }),
);

//route handlers
app.use('/', indexRouter); //Require the routes for the main pages
app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.
app.use('/', authRouter); //any requests that match the routes defined in auth.js will be handled by that file.
app.use('/collection', collectionRouter);
app.use('/search', searchRouter); // Mount the /search route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//export to be used by /bin/wwww
module.exports = app;
