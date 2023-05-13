const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  console.log("HEEEEEEREEEE3", req)

  let validationErrors = validationResult(req);
  console.log("VALERRORS===== ", validationErrors)


  let errObj = {};

  if (!validationErrors.isEmpty()) {
    console.log("IN VAL.JS IF NOT EMPTY")

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
    console.log("E.MESSSSSAGGEEEEEEE: ", e)
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
