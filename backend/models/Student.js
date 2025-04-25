const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  nationality: { type: String },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  graduationYear: { type: String },
  
});

module.exports = mongoose.model('Student', studentSchema);
