const passport = require('passport');
const { signUpStrategyWithPassport, loginStrategyWithPassport } = require('./strategies/local.strategy.js');
const jwtStrategy = require('./strategies/jwt.strategy.js');

passport.use('signup', signUpStrategyWithPassport);
passport.use('login', loginStrategyWithPassport);
passport.use(jwtStrategy);
