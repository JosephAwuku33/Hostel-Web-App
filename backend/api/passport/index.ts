// serialization and deserialization of users occurs here
import passport from "passport";
import User from "../data/models/User.js";

const passportSetup = passport;
passportSetup.serializeUser((user: any, done) => {
  console.log("=== serialize ... called ===");
  console.log(user); // the whole raw user object!
  console.log("---------");
  done(null, { _id: user._id });
});

passportSetup.deserializeUser(async (id, done) => {
  console.log("Deserialize......called");
  try {
    const user = await User.findById(id)
    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
});

export default passportSetup;

