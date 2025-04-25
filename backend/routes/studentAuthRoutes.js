//studentauthrouter
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Student Google Auth
router.get('/google',
  passport.authenticate('google-student', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get('/google/callback',
  passport.authenticate('google-student', { failureRedirect: '/' }),
  (req, res) => {
    console.log('✅ Student Authenticated:', req.user);
    res.redirect('http://localhost:5173/dashboard/aspirants');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Student logged out' });
    });
  });
});

router.get('/check-auth', (req, res) => {
  res.json({ student: req.user || null });
});

module.exports = router;
