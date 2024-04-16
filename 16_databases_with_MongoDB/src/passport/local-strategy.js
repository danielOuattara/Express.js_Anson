import passport from "passport";
import { Strategy } from "passport-local";
import User from "../mongoose/schema/user.schema.js";

//---------------------------------------------------

export default passport.use(
  new Strategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.password !== password) {
        throw new Error("Invalid credentials");
      }
      // all OK !
      return done(null, user);
    } catch (error) {
      console.log(error);
      done(error, false);
    }
  }),
);

//------------------

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//-------------------

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    done(null, user);
  } catch (error) {
    done(err, false);
  }
});
