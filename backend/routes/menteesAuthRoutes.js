//menteeAuthRoutes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google-mentee', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    session: false, // Disable session
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google-mentee', { session: false, failureRedirect: '/' }), // Disable session
  (req, res) => {
    try {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.redirect('http://localhost:5173/dashboard/mentees');
    } catch (error) {
      console.error('Error in mentee callback:', error);
      res.redirect('/?error=authentication_failed');
    }
  }
);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
});

router.get(
  '/check-auth',
  passport.authenticate('jwt', { session: false }), // Use passport-jwt
  (req, res) => {
    res.json({ mentee: req.user });
  }
);

module.exports = router;