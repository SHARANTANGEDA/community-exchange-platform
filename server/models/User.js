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
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model('users',UserSchema);

