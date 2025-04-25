const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('../models/Student');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);  // Store the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Student.findById(id);
    console.log("👤 Deserialized user:", user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("✅ Google Profile:", profile);

    const email = profile.emails[0].value;
    let existingUser = await Student.findOne({ email });

    if (existingUser) return done(null, existingUser);

    // Split full name into firstName and lastName
    const fullName = profile.displayName.split(' '); // naive split
const firstName = fullName[0];
const lastName = fullName.slice(1).join(' '); // handles middle names too

const newUser = new Student({
  firstName: firstName,
  lastName: lastName,
  email: profile.emails[0].value,
});
    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;
