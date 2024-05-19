const passport = require("passport");
const jwt = require('jsonwebtoken');
const db = require('../config/database.js'); // Ensure correct path to your database config

const { sign } = jwt;

class AuthController {

  signupUser = async (req, res, next) => {
    passport.authenticate('signup', { session: false },
      async (err, user, info) => {
        if (err) {
          return res.send({ message: err.message });
        }
        return res.send({ user });
      })(req, res, next);
  }

  loginUser = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          return res.send({ message1: err?.message || info });
        }
        req.login(
          user,
          { session: false },
          async (err) => {
            if (err) res.send({ message2: err.message });

            const body = { _id: user.id, email: user.email };
            const token = sign({ user: body }, process.env.JWT_SECRET);

            return res.send({ "jwt": token });
          }
        );
      } catch (err) {
        return res.send({ message3: err.message });
      }
    })(req, res, next);
  }
}

module.exports = new AuthController();
