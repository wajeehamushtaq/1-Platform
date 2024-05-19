const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const db = require('../../database');

// Signup Strategy
const signUpStrategyWithPassport = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const existingUser = await db('users').where({ email }).first();
      if (existingUser) {
        return done(null, false, { message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email,
        password: hashedPassword,
      };

      const [userId] = await db('users').insert(newUser).returning('id');

      newUser.id = userId;

      done(null, newUser);
    } catch (err) {
      done(err);
    }
  }
);

const loginStrategyWithPassport = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await db('users').where({ email }).first();
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect email or password' });
      }
    } catch (err) {
      return done(err);
    }
  }
);

module.exports = {
  signUpStrategyWithPassport,
  loginStrategyWithPassport,
};
