const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')
const bodyParser = require('body-parser')

//Mongo Model
const Department = require('../../models/Department')
const User = require('../../models/User')
const Course = require('../../models/Course')

const validateCourseInput = require('../../validations/course')
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
    let courses = department.coursesId
    if(courses.length===0) {
      console.log(department)
      res.json({NoCourse: 'No courses found' ,department})
    }else {
      let courseDetails = [];
      courses.forEach(courseId => {
        Course.find({courseCode: courseId}).then(course => {
          courseDetails.push(course);
        })
      })
      res.json({allCourses:courseDetails,department})
    }
  }).catch(err => {
    res.status(404).json({ Error: 'Error on our side please bear with us' })
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
  });


//@Add Course
router.post('/addCourse',passport.authenticate('hod',{session: false}),
  (req,res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    Course.find({ courseCode: req.body.courseCode }).then(course => {
      if (course) {
        errors.courseCode = 'Course Code Already exists please use different one'
        return res.status(400).json(errors)
      } else {
        let toStoreFaculty = req.body.facultyId.trim();
        if (toStoreFaculty.endsWith(',')) {
          toStoreFaculty = toStoreFaculty.substr(0, toStoreFaculty.length - 1);
        }
        if (toStoreFaculty.startsWith(',')) {
          toStoreFaculty = toStoreFaculty.substr(1, toStoreFaculty.length);
        }
        toStoreFaculty = toStoreFaculty.toArray();
        let status;
        status = req.body.facultyId.length !== 0;
        const newCourse = new Course({
          courseCode: req.body.courseCode,
          courseName: req.body.courseName,
          facultyId: toStoreFaculty,
          bio: req.body.bio,
          status: status,
        });

        newCourse.save().then(course => res.json(course)).catch(err => res.json(errors));
      }
    })
});

//@unAssigned Faculty
router.get('/unAssignedFaculty',passport.authenticate('hod',{session: false}),
  (req,res) => {
    User.find({role: 'faculty', assigned: false}).then(faculty => {
      if(faculty) {
        res.json(faculty);
      }else {
        res.json({noUnAssignedFaculty: 'All faculty are assigned at least one of the courses'})
      }
    }).catch(err => res.status(404).json({notFound: 'faculty not found'}))
});
router.post('/addDep',(req,res) => {

  let newDepartment = new Department({
    hod: req.body.hod,
    departmentName: req.body.departmentName
  });
  newDepartment.save().then(department => res.json(department)).catch(err => res.json(err));
})
module.exports = router;

