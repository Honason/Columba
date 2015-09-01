var express = require('express');
var path = require('path');
var logger = require('morgan');
var expressValidator = require('express-validator');
var passport = require('passport');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongo = require('mongodb');
var mongoose = require('mongoose');
 
var upload = multer({ dest: 'uploads/' })
mongoose.connect('mongodb://root:root@ds039311.mongolab.com:39311/node-workshop');
var db = mongoose.connection;
 
var routes = require('./routes/index');
var users = require('./routes/users');
var proposals = require('./routes/proposals');

var app = express();

app.use('/angular', express.static(path.join(process.cwd(), 'angular')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.get('/', function(request, response){
    response.sendFile(__dirname +'/angular/index.html');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

// Passport
app.use(passport.initialize());

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/users', users);
app.use('/proposals', proposals);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  res.redirect('/');
  //err.status = 404;
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;