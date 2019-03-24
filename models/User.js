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

