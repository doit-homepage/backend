var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var mypageRouter = require('./routes/mypage');
var infoRouter = require('./routes/info')
var studyRouter = require('./routes/study')
var mainRouter = require('./routes/main')
var authRouter = require('./routes/auth.js')

var app = express();

var sequelize = require('./models').sequelize;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

sequelize.sync();
dotenv.config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/mypage', mypageRouter);
app.use('/info', infoRouter);
app.use('/study', studyRouter);
app.use('/main', mainRouter);
app.use('/auth', authRouter)

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
