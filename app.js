var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Router = require('./routes/index');
var memoRouter = require('./routes/memo/memo')
var app = express();
var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user:user@cluster0-kyrxd.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser:true });
var db = mongoose.connection;
db.on('error',()=>{
  console.error('connection error');
})
db.once('open',()=>{
  console.log('connection sucess')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Router);
app.use('/memo',memoRouter);

module.exports = app;