var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let methodOverride = require('method-override');

let session = require('express-session')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let daysRouter = require('./routes/days');
let workoutsRouter = require('./routes/workouts')

var app = express();

require('dotenv').config();
require('./config/database');
require('./config/passport');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/days', daysRouter);
app.use('/workouts', workoutsRouter);

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

module.exports = app;
