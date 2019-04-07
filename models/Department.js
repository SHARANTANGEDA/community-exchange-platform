const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DepartmentSchema = new Schema({
  hod: {
    type: String,
    required: true
  },
  hodEmail: {
    type: String
  },
  departmentName: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  courses: [{
    courseCode: {
      type: String
    },
    courseName: {
      type: String
    },
    facultyId: {
      type: [String]
    },
    status: {
      type: Boolean,
      required: true,
      default: false
    },
    bio: {
      type: String
    },
    time: {
      type: Date,
      default: Date.now
    }
  }],
})
module.exports = Department = mongoose.model('department', DepartmentSchema)