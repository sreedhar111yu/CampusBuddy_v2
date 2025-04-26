const mongoose = require('mongoose');

const menteesSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String }, 
  department: { type: String }, 
  course:{type:String},

  phoneNo: { type: String }, 
  gender: { type: String, enum: ['Male', 'Female', 'Other'] }, 
  graduationYear: {
    start: { type: Number },
    end: { type: Number }
  },
  role: { type: String, enum: ['student', 'passedout'] }, 
  insight: { type: String } 
});

const Mentee = mongoose.model('Mentee', menteesSchema);

module.exports = Mentee;
