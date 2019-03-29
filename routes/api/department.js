const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')
const bodyParser = require('body-parser')

//Mongo Model
const Department = require('../../models/Department')
const User = require('../../models/User')
const Course = require('../../models/Course')

const validateQuestionInput = require('../../validations/askQuestions')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//TODO set hod home page
router.get('/home', passport.authenticate('hod', { session: false }), (req, res) => {
  Department.findOne({ hod: req.user._id })
    .then(department => {
      User.find({ departmentName: department.departmentName, role: 'faculty' }).then(faculty => {
        res.json({ department, faculty })
      }).catch(err => res.json({ noFaculty: 'There are no faculty in this department', department }))
    }).catch(err => res.status(404).json({ noPostsFound: 'No posts found' }))
})
router.get('/allCourses', passport.authenticate('hod', { session: false }), (req, res) => {
  Department.findOne({ hod: req.user._id }).then(department => {
    let courses = department.courses
    res.json(courses)
  }).catch(err => {
    res.status(404).json({ NoCourse: 'No courses found' })
  })
})

//@ Display Individual Course
router.get('/course/:id', passport.authenticate('hod', { session: false })
  , (req, res) => {
    Course.findById(req.params.id).then(course => {
      if (course.status === false) {
        res.json({ course, faculty: 'Not Assigned anyone here' })
      } else {
        res.json(course)
      }
    }).catch(err => {
      res.status(404).json({ noCourseFound: 'No Course found with that ID' })
    })
  })

//Assign Faculty by their emailAddress
router.post('/course/:id/assignFaculty', passport.authenticate('hod', { session: false }),
  (req, res) => {
    let courseFields = {}
    let facultyFields = {}
    let courseStatus, facultyStatus, coursesArray,facultyArray;

    User.findOne({ emailId: req.body.emailId, role: 'faculty' }).then(faculty => {
      facultyStatus = faculty.status
      coursesArray = faculty.courses
    }).catch(err => {res.status(404).json({ facultyNotFound: 'faculty not found' })})

    Course.findById(req.params.id).then(course => {
      facultyArray = course.facultyId;
      courseStatus = course.status
      coursesArray.push(course.courseCode)
      facultyFields.courses = coursesArray
      facultyFields.assigned = true
      User.findOneAndUpdate(
        { emailId: req.body.emailId, role: 'faculty' }
        , { $set: facultyFields },
        { new: true }).then(faculty => {
          facultyArray.push(faculty._id);
        courseFields.facultyId = facultyArray;
        courseFields.status = true;
      }).catch(err => {res.status(404).json({ facultyNotFound: 'faculty not found' })})
    }).catch(err => res.status(404).json({ courseNotFound: 'No Course Found' }))

    Course.findByIdAndUpdate(req.params.id, { $set: courseFields },{new: true}).then(course => {
      res.json(course)
    }).catch(err => res.status(404).json({ courseNotFound: 'No Course Found' }))
  }

)
module.exports = router

