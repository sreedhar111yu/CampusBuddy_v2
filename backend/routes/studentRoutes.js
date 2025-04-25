const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ isAuthenticated: false, message: 'User not authenticated' });
}

// ✅ POST: Create Student (if needed manually)
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PUT: Update Student Info
router.put('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET: Authenticated User Details
router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ isAuthenticated: false, message: 'User not authenticated' });
  res.json(req.user);
});

// ✅ GET: All Students (for admin use maybe)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
