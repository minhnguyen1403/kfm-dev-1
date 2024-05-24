const createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');
const http = require('http')
var app = express();
const server = http.createServer(app);
const {
  UserController
} = require('./controllers');
const { clientErrorHandler, logError, renderErrorHandler } = require('./middlewares/error-handler')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, HEAD',
    );
    return res.status(200).json({});
  }

  // Allow get filename
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  return next();
});

// Json parser middleware
app.use(bodyParser.json({ limit: '10mb' }));

// Url encoded parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Config and connect db
// if (config.db)
//   await require('./models').configMongoose(config.db, options.onDbConnected);
UserController.run(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(logError);
app.use(clientErrorHandler);
app.use(renderErrorHandler);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/** handle logic */

const port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log(`Server is running on port: `, port);
  server.keepAliveTimeout = 65000;
  server.headersTimeout =  66000;
  server.setTimeout( 10 * 60 * 1000);
})
//app.set('port', port);
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

module.exports = app;
