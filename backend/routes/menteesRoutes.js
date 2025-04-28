//mentee routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Mentee = require('../models/Mentee');

// POST: Create a new mentee
router.post('/', async (req, res) => {
  try {
    const mentee = await Mentee.create(req.body);
    res.status(201).json(mentee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Authenticated mentee info
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const mentee = await Mentee.findById(req.user._id);

      if (!mentee) {
        return res.status(404).json({ message: 'Mentee not found' });
      }

      res.json(mentee);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// PUT: Update mentee info
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const updatedMentee = await Mentee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!updatedMentee) {
        return res.status(404).json({ message: 'Mentee not found' });
      }

      res.json(updatedMentee);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;