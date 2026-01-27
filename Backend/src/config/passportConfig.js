import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });

      // Account locked check
      if (user.accStatus === "LOCKED") {
        return done(null, false, {
          message: "Account is locked. Contact support.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        user.failedLoginAttempts += 1;

        // Lock after 3 attempts
        if (user.failedLoginAttempts >= 3) {
          user.accStatus = "LOCKED";
        }

        await user.save();

        return done(null, false, { message: "Incorrect password" });
      }

      // Successful login → reset counters
      user.failedLoginAttempts = 0;
      await user.save();
      return done(null, user);

    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
