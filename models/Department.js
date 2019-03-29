const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DepartmentSchema = new Schema({
  hod: {
    type: String,
    required: true
  },
  departmentName: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  coursesId: {
    type: [String]
  }
})
module.exports = Department = mongoose.model('department', DepartmentSchema)