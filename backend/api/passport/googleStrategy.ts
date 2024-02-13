import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { PassportStatic } from "passport";
import User from "../data/models/User.js";

const configureGoogleStrategy = async (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/users/google/callback",
      },
      async (token, tokenSecret, profile: Profile, done) => {
        try {
          console.log("===== GOOGLE PROFILE =======");
          console.log(profile);
          console.log(profile.emails);
          console.log("======== END ===========");

          const { id, name, emails } = profile;

          // Check if the profile has emails and the emails array is not empty
          if (emails && emails.length > 0) {
            // Choose the first email as the primary email
            const primaryEmail = emails[0].value;
            console.log("Primary email is " + primaryEmail);

            const existingUser = await User.findOne({ "google.googleId": id });

            console.log("====== PRE SAVE =======");
            console.log(id);
            console.log(profile);
            console.log("====== post save ....");
            if (existingUser) {
              return done(null, existingUser);
            }

            // if no user in our db, create a new user with that googleId
            const newGoogleUser = await User.create({
              "google.googleId": id,
              first_name: name?.givenName,
              last_name: name?.familyName,
              email: primaryEmail,
            });

            console.log(newGoogleUser._id);

            if (newGoogleUser) {
              return done(null, newGoogleUser);
              // Note: The return statement here is not necessary, as we've already sent the response.
            } else {
              // If User.create fails, throw an error to handle it
              throw new Error("Invalid user data");
            }
          } else {
            // Handle case where the user doesn't have an email address
            console.log("User does not have an email address");
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};

export { configureGoogleStrategy };
