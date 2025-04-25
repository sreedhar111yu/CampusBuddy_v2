const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String, 
  phone: String,
  college: String,
  interests: [String],
  insights: String
});

module.exports = mongoose.model('Student', studentSchema);
