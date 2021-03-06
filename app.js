const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const about = require('./routes/about');
const house_shop = require('./routes/house_shop');
const logging = require('./routes/entityies');
const details = require('./routes/details');
const edit = require('./routes/edit');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/about', about);
app.use('/house_shop', house_shop);
app.use('/logging', logging);
app.use('/details', details);
app.use('/edit', edit);
//conn to db
var mongoDB = 'mongodb://127.0.0.1/my-database';
mongoose.connect(mongoDB);
//Get mongose to use global promise library
mongoose.Promise = global.Promise;
//Get the dafault connection
var db = mongoose.connection;
//bind connection to error event(to get notification of conn error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
