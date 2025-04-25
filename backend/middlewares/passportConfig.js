const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('../models/Student');
const Mentee = require('../models/Mentee');
require('dotenv').config();

// 🔐 Serialize only user ID
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// 🔄 Deserialize by checking both collections
passport.deserializeUser(async (id, done) => {
  try {
    let user = await Student.findById(id);
    if (!user) user = await Mentee.findById(id);

    console.log("👤 Deserialized user:", user);
    done(null, user);
  } catch (err) {
    console.error("❌ Error in deserialization:", err);
    done(err, null);
  }
});

// 👨‍🎓 Google Strategy for Students
passport.use('google-student', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/student/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let existingUser = await Student.findOne({ email });

    if (existingUser) return done(null, existingUser);

    const [firstName, ...rest] = profile.displayName.split(' ');
    const lastName = rest.join(' ');

    const newUser = new Student({ firstName, lastName, email });
    await newUser.save();

    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}));

// 👩‍💼 Google Strategy for Mentees
passport.use('google-mentee', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/mentee/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let existingUser = await Mentee.findOne({ email });

    if (existingUser) return done(null, existingUser);

    const [firstName, ...rest] = profile.displayName.split(' ');
    const lastName = rest.join(' ');

    const newUser = new Mentee({ firstName, lastName, email });
    await newUser.save();

    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;
