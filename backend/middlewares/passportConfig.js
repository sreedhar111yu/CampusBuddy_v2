const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('../models/Student');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);  // Store the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  const user = await Student.findById(id);
  console.log("👤 Deserialized user:", user); // Add this
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  console.log("✅ Google Profile:", profile); // <== Add this

  let existingUser = await Student.findOne({ email: profile.emails[0].value });
  if (existingUser) return done(null, existingUser);

  const newUser = new Student({
    name: profile.displayName,
    email: profile.emails[0].value,
    role: 'studying'
  });

  await newUser.save();
  return done(null, newUser);
}));

module.exports = passport;