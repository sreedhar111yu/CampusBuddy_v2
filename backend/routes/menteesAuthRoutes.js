const express = require('express');
const passport = require('passport');
const router = express.Router();

// Mentee Google Auth
router.get('/google',
  passport.authenticate('google-mentee', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get('/google/callback',
  passport.authenticate('google-mentee', { failureRedirect: '/' }),
  (req, res) => {
    console.log('✅ Mentee Authenticated:', req.user);
    res.redirect('http://localhost:5173/dashboard/mentees');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Mentee logged out' });
    });
  });
});

router.get('/check-auth', (req, res) => {
  res.json({ mentee: req.user || null });
});

module.exports = router;
