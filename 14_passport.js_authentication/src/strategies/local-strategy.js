import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../data/index.js";

/**
 * By default the instance from `new Strategy()` accept a function
 * which expect `username` & `password` as default credentials for
 * local strategy.
 *
 * However, one can use `email` instead of `username` as specified
 * below
 */

// export default passport.use(
//   new Strategy({ usernameField: "email" }, function (email, password, done) {
//     try {
//       console.log("email = ", email);
//       console.log("password = ", password);
//       const user = users.find((user) => user.email === email);
//       if (!user) {
//         throw new Error("User not found");
//       }
//       if (user.password !== password) {
//         throw new Error("Invalid credentials");
//       }
//       // all OK !
//       return done(null, user);
//     } catch (error) {
//       console.log(error);
//       done(error, null);
//     }
//   }),
// );

//---------------------------------------------------

passport.serializeUser((user, done) => {
  console.log(`\n\n\nInside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`\n\n\nInside Deserialize User ID : ${id}`);
  try {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    done(null, user);
  } catch (error) {
    done(err, false);
  }
});

export default passport.use(
  new Strategy(function (username, password, done) {
    try {
      console.log("username = ", username);
      console.log("password = ", password);
      const user = users.find((user) => user.username === username);
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
      done(error, null);
    }
  }),
);

//-----------------------------------------------------------

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   }),
// );
