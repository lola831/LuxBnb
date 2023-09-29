const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {

  let validationErrors = validationResult(req);

  let errObj = {};

  if (!validationErrors.isEmpty()) {

    //checks if errors array is empty
  //   const errors = {};
  //   validationErrors
  //     .array()
  //     .forEach(error => errors[error.param] = error.msg);

  //   const err = Error("Bad request.");
  //   err.errors = errors;
  //   err.status = 400;
  //   err.title = "Bad request.";
  //   next(err);
  // }
  // next();
  validationErrors.errors.forEach(e => {
    let nameKey = e.param
    let message = e.msg
    errObj[nameKey] = message
  })
  const err = Error('Validation Error');
  err.errors = errObj;

  err.status = 400;
  err.title = 'Bad request.';
  next(err)
}
next();
};


module.exports = {
  handleValidationErrors
};
