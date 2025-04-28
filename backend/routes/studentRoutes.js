//studentRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Student = require('../models/Student');

// POST: Create Student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Update Student Info
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// GET: Authenticated User Full Details
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const student = await Student.findById(req.user._id);

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET: All Students (for admin use maybe)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;