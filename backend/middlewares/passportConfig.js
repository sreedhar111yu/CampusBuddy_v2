//passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../models/Student');
const Mentee = require('../models/Mentee');
require('dotenv').config();

// Google Strategy for Students
passport.use(
  'google-student',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.STUDENT_GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/student/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let existingUser = await Student.findOne({ email });

        if (existingUser) {
          return done(null, existingUser);
        }

        const [firstName, ...rest] = profile.displayName.split(' ');
        const lastName = rest.join(' ');

        const newUser = new Student({ firstName, lastName, email });
        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Google Strategy for Mentees
passport.use(
  'google-mentee',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.MENTEE_GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/mentee/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let existingUser = await Mentee.findOne({ email });

        if (existingUser) {
          return done(null, existingUser);
        }

        const [firstName, ...rest] = profile.displayName.split(' ');
        const lastName = rest.join(' ');

        const newUser = new Mentee({ firstName, lastName, email });
        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// JWT Strategy for Token Verification
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(), // Support Bearer token
    (req) => req.cookies.token || null, // Support JWT in cookie
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      let user = await Student.findById(jwt_payload.id);
      if (!user) {
        user = await Mentee.findById(jwt_payload.id);
      }

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);