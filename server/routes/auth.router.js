const express = require('express');
const authController = require('../controllers/auth.controller.js');
const validatePayload = require('../validations/user.validation.js');
const checkValidationErrors = require('../middlewares/checkErrors.middleware.js');


const authRouter = express.Router();

authRouter.post(
  '/signup',
  validatePayload.userSignup(),
  checkValidationErrors,
  authController.signupUser
);

authRouter.post(
  '/login',
  validatePayload.userLogin(),
  checkValidationErrors,
  authController.loginUser
);

module.exports = authRouter;
