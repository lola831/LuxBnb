const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes); // Connect all the routes

// error handling middleware goes after the routes!

//this error will show if we dont hit any of the routes above
// 404 error handler:
app.use((_req, _res, next) => { //underscores before req/res just mean we dont use these arguments in our cb function
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." }; //push errors into array
  err.status = 404;
  next(err);
});

// Process sequelize errors
//catches sequelize  database validation errors
app.use((err, req, res, next) => {
  (console.log("IN APP.JS PROCESS SEQUELIZE ERRORS MIDDLEARE"))
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {

    let errObj = {};
    err.errors.forEach(e => {
      let newKey = e.path;
      let newVal = e.message;
      errObj[newKey] = newVal;
    })

    err.message = 'Validation Error';
    err.errors = errObj;
    err.status = 400;

    return res.json({
      // title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      statusCode: err.status
      // stack: isProduction ? null : err.stack
    })

    // for (let error of err.errors) {
    //   errors[error.path] = error.message;
    // }
    // err.title = 'Validation error';
    // err.errors = errors;
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);  //if no err.status already set to default 500
  console.error(err);   //used for developers..comment out in production
  return res.json({ // in our response include:
    //title: err.title || 'Server Error', //if no err.title default to 'server error'
    message: err.message,
    errors: err.errors, // send the errors themselves (which are often an array of errors)
    statusCode: err.status,
    // stack: isProduction ? null : err.stack //only going to provide the stack in the respomse if we are not in production
    // if were in production(if its true) the stack property will be set to null
  });
});

module.exports = app;
