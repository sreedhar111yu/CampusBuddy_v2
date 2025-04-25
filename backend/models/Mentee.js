const mongoose = require('mongoose');

const meenteesSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  phoneNo: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  graduationYear: {
    start: { type: Number, required: true },
    end: { type: Number, required: true }
  },
  role: { type: String, enum: ['student', 'passedout'], required: true },
  insight: { type: String }
});

const Meentee = mongoose.model('Meentee', meenteesSchema);

module.exports = Meentee;
