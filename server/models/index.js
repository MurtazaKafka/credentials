const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, required: true, enum: ['student', 'high_school_official', 'university_official'] }
}, { timestamps: true });

// High School Schema
const highSchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  officialContact: String,
  verificationStatus: { type: Boolean, default: false }
}, { timestamps: true });

// Student Schema
const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  highSchool: { type: mongoose.Schema.Types.ObjectId, ref: 'HighSchool', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: Date
}, { timestamps: true });

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  highSchool: { type: mongoose.Schema.Types.ObjectId, ref: 'HighSchool', required: true },
  issueDate: { type: Date, required: true },
  uniqueIdentifier: { type: String, required: true, unique: true },
  grades: [{
    subject: { type: String, required: true },
    grade: { type: String, required: true }
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const HighSchool = mongoose.model('HighSchool', highSchoolSchema);
const Student = mongoose.model('Student', studentSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = { User, HighSchool, Student, Certificate };