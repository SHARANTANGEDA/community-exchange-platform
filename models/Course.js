const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
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
})
module.exports = Course = mongoose.model('course', CourseSchema)