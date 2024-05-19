const { body, check } = require('express-validator');
const db = require('../config/database.js');

class UserPayloadValidation {
  userSignup = () => {
    return [
      body('first_name', 'First name is required').notEmpty(),
      body('last_name', 'Last name is required').notEmpty(),
      body('email', 'Email is required').notEmpty(),
      body('email', 'Email is not valid').isEmail(),
      check('email').custom(async (value) => {
        const user = await db('users').where({ email: value }).first();
        if (user) {
          return Promise.reject('Email already exists');
        }
      }),
      body('password', 'Password is required').notEmpty()
    ];
  }

  userLogin = () => {
    return [
      body('email', 'Email is required').notEmpty(),
      body('password', 'Password is required').notEmpty(),
    ];
  }
}

module.exports = new UserPayloadValidation();
