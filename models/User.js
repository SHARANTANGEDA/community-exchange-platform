const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  departmentName: {
    type: String
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
  applyTA: {
    type: Boolean,
    default:false
  },
  taCourse: {//TODO Student
    type: String
  },
  courses: {// Course Code
    type: [String]
  },
  assigned: {//Faculty
    type: Boolean,
    default: false
  },
  reputation: {
    type: Number,
    default: 0,
    required: true
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

