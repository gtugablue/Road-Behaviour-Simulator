var express = require('express');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var config = require('./configuration/config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var errors = require('./utils/errors');

var index = require('./routes/index');
var users = require('./routes/users');
var quiz = require('./routes/quiz');
var create = require('./routes/create');
var dashboard = require('./routes/dashboard');

var app = express();

////////// Passport setup ///////////
// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', key: 'sid', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Partials
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use('/', index);
app.use('/dashboard', dashboard);
app.use('/users', users);
app.use('/quiz', quiz);
app.use('/create', create);

/////// Authentication routes ///////
app.get('/auth/facebook',
  passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: config.bad_login_redirect }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(config.good_login_redirect);
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect(config.bad_login_redirect);
});
////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

errors.clearErrors();

module.exports = app;
