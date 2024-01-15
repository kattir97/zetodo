const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const { validatePassword } = require("./utils/passwordUtils");

const verifyCallback = async (username, password, done) => {
  try {
    const response = await db.query("SELECT * FROM users WHERE users.username = $1", [username]);
    const user = response.rows[0];

    if (!user) {
      return done(null, false);
    }
    // console.log("USER", user);
    const isValid = validatePassword(password, user.hash, user.salt);
    console.log("VALID:", isValid);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
};

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
  console.log("serialize");
  console.log("USERID", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const response = await db.query("SELECT * from users WHERE users.id = $1", [id]);
    const user = response.rows[0];
    console.log("deserialize");
    done(null, user);
  } catch (error) {
    done(error);
  }
});
