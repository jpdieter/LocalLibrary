const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); //Used to parse the cookie header and populate req.cookies (essentially provides a convenient method for accessing cookie information).
const logger = require('morgan');
require('dotenv').config()

//These modules/files contain code for handling particular sets of related "routes" (URL paths). 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

const app = express();

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
app.use(express.static(path.join(__dirname, 'public'))); //serve all static files in the /public directory

//route handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.

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

