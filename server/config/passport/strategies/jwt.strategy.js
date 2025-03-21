const { Strategy: JWTstrategy, ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');

dotenv.config();

const jwtStrategy = new JWTstrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (err) {
      done(err);
    }
  }
);

module.exports = jwtStrategy;
