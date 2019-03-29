const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  departmentName: {
    type: String,
    required: true
  },
  githubUsername: {
    type: String
  },
  linkedIn: {
    type: String
  },
  codeForces: {
    type: String
  },
  website: {//hod and faculty
    type: String
  },
  blog: {//Faculty
    type: String
  },
  role: {
    type: String,
    required: true
  },
  isTA: {//TODO Student
    type: Boolean,
    default: false
  },
  courses: {//TODO Faculty
    type: [String]
  },
  assigned: {//TODO Faculty
    type: Boolean,
    default: false
  },
 // isVerified: {
 //  type: Boolean,
   // default: false
 // },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users',UserSchema);

