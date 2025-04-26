// menteesRoutes.js
const express = require("express");
const router = express.Router();
const Mentee = require("../models/Mentee");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ isAuthenticated: false, message: 'User not authenticated' });
}

// POST: Create a new mentee
router.post('/', async (req, res) => {
  try {
    const mentee = await Mentee.create(req.body);
    res.status(201).json(mentee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', ensureAuthenticated, async (req, res) => {
    try {
      const mentee = await Mentee.findById(req.user._id);
  
      if (!mentee) {
        return res.status(404).json({ message: 'Mentee not found' });
      }
  
      res.json(mentee);
  
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// PUT: Update mentee info (only if authenticated)
router.put('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedMentee = await Mentee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMentee) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updatedMentee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Authenticated mentee info
// router.get('/me', (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ isAuthenticated: false, message: 'User not authenticated' });
//   }
//   res.json(req.user);
// });


module.exports = router;
