const { validationResult } = require('express-validator');

const checkValidationErrors = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if(validationErrors.isEmpty()) {
    next();
  } else {
    res.status(400).send({ errors: validationErrors })
  }
}

module.exports = checkValidationErrors;