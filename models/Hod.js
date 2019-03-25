const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HodSchema = new Schema({
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

  linkedIn: {
    type: String
  },
  website: {
    type: String
  },
  blog: {
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

module.exports = Hod = mongoose.model('hod',HodSchema);

