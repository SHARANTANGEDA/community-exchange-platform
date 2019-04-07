const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')
const bodyParser = require('body-parser')

//Mongo Model
const Department = require('../../models/Department')
const User = require('../../models/User')
const validateCourseInput = require('../../validations/course')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/allDepartments',(req, res) => {
  Department.find().then(department => {
    res.json(department)
  }).catch(err => res.status(404).json({NoDepFound: 'no Department found'}))
})

//TODO set hod home page
router.get('/home', passport.authenticate('hod', { session: false }), (req, res) => {
  Department.findOne({ hod: req.user._id })
    .then(department => {
      User.find({ departmentName: department.departmentName, role: 'faculty' }).then(faculty => {
        res.json({ department, faculty })
      }).catch(err => res.json({ noFaculty: 'There are no faculty in this department', department }))
    }).catch(err => res.status(404).json({ noPostsFound: 'No Department found' }))
})
router.get('/allCourses', passport.authenticate('hod', { session: false }), (req, res) => {
  Department.findOne({ hod: req.user._id }).then(department => {
    let courses = department.courses
      // let courseDetails = [];
      // courses.forEach(courseId => {
      //   Course.find({courseCode: courseId}).then(course => {
      //     courseDetails.push(course);
      //   }).catch(err => { res.json({NoCourse: 'No courses found' ,department})})
      // })
      res.json({allCourses:courses,department})
  }).catch(err => {
    res.status(404).json({ Error: 'Error on our side please bear with us' })
  })
})

//@ Display Individual Course
router.get('/course/:id', passport.authenticate('hod', { session: false })
  , (req, res) => {
    Department.findOne({hod:req.user._id}).then(department => {
      let getProfs = [];
      department.courses.forEach(course => {
        if(course.courseCode === req.params.id) {
          let fIds = course.facultyId
          fIds.forEach(fid => {
            User.findById(fid).then(fac => {
              getProfs.push(fac);
            })
          })
          res.json({course,faculty:getProfs})
        }
      })
    }).catch(err => {
      res.status(404).json({ noCourseFound: 'No Course found with that ID' })
    })
  })

// Course.findById(req.params.id).then(course => {
    //   let facultyIds = course.facultyId;
    //   let getProfs = [];
    //   facultyIds.forEach(fid => {
    //     User.findById(fid).then(fac => {
    //       getProfs.push(fac);
    //     })
    //   })
    // })

//Assign faculty by course ID
router.get('/faculty/:id', passport.authenticate('hod', { session: false }),
  (req, res) => {
  Department.findOne({hod: req.user._id}).then(department => {
    User.find({ departmentName: department.departmentName, role: 'faculty' }).then(faculty => {
      let notCourseFaculty=[];
      faculty.forEach(fac => {
      })
      console.log(department,faculty)
      res.json({ department, faculty,courseId: req.params.id })
    }).catch(err => res.json({ noFaculty: 'There are no faculty in this department', department
      ,courseId: req.params.id}))
  }).catch(err => res.status(404).json({ noPostsFound: 'No Department found' }))
})

//Assign Faculty by courseId and facultyId
router.post('/assignFaculty', passport.authenticate('hod', { session: false }),
  (req, res) => {
    let courseFields = {}
    let facultyFields = {}
    let courseStatus, facultyStatus, coursesArray,facultyArray;
    User.findById(req.body.facultyId).then(faculty => {
      facultyStatus = faculty.status
      coursesArray = faculty.courses
    }).catch(err => {res.status(404).json({ facultyNotFound: 'faculty not found' })})
    Department.findOne({hod: req.user._id}).then(department => {
      department.courses.forEach(course => {
        if(course.courseCode===req.body.id) {
          facultyArray = course.facultyId;
          courseStatus = course.status
          coursesArray.push(course.courseCode)
          facultyFields.courses = coursesArray
          facultyFields.assigned = true
          User.findByIdAndUpdate(req.body.facultyId, { $set: facultyFields },
            { new: true }).then(faculty => {
            facultyArray.push(faculty._id);
            courseFields.facultyId = facultyArray;
            courseFields.status = true;
            course.facultyId = facultyArray;
            course.status = true;
          }).catch(err => {res.status(404).json({ facultyNotFound: 'faculty not found' })})
          department.save().then(department => {res.json(department)})
        }
      })
    }).catch(err => res.status(404).json({ courseNotFound: 'No Course Found' }))
    // Course.findById(req.params.id).then(course => {
    //   facultyArray = course.facultyId;
    //   courseStatus = course.status
    //   coursesArray.push(course.courseCode)
    //   facultyFields.courses = coursesArray
    //   facultyFields.assigned = true
    //   User.findOneAndUpdate(
    //     { emailId: req.body.emailId, role: 'faculty' }
    //     , { $set: facultyFields },
    //     { new: true }).then(faculty => {
    //       facultyArray.push(faculty._id);
    //     courseFields.facultyId = facultyArray;
    //     courseFields.status = true;
    //   }).catch(err => {res.status(404).json({ facultyNotFound: 'faculty not found' })})
    // }).catch(err => res.status(404).json({ courseNotFound: 'No Course Found' }))
    // ).catch(err => res.status(404).json({ courseNotFound: 'No Course Found' }))
    // Department.findByIdAndUpdate(req.params.id, { $set: courseFields },{new: true}).then(course => {
    //   res.json(course)
    // })
  });


//@Add Course
router.post('/addCourse',passport.authenticate('hod',{session: false}),
  (req,res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.user._id)
    Department.findOne({hod:req.user._id}).then(department => {
      let existCourse=department.courses.filter(course => course.courseCode === req.body.courseCode).length
      if(existCourse>0) {
        errors.courseCode = 'Course Code Already exists'
        return res.status(400).json(errors)
      } else {
        const newCourse ={
          courseCode: req.body.courseCode,
          courseName: req.body.courseName,
          bio: req.body.bio,
          status: false
        };
        department.courses.unshift(newCourse);
        department.save().then(department => res.json(department)).catch(err => res.json(errors));
      }
    }).catch(err => res.status(404).json({notFound: 'department not found'})
    )
    // Course.find({ courseCode: req.body.courseCode }).then(course => {
    //   if (course) {
    //     errors.courseCode = 'Course Code Already exists'
    //     return res.status(400).json(errors)
    //   } else {
    //     let toStoreFaculty = req.body.facultyId.trim();
    //     if (toStoreFaculty.endsWith(',')) {
    //       toStoreFaculty = toStoreFaculty.substr(0, toStoreFaculty.length - 1);
    //     }
    //     if (toStoreFaculty.startsWith(',')) {
    //       toStoreFaculty = toStoreFaculty.substr(1, toStoreFaculty.length);
    //     }
    //     toStoreFaculty = toStoreFaculty.toArray();
    //     let status;
    //     status = req.body.facultyId.length !== 0;
    //     const newCourse = new Course({
    //       courseCode: req.body.courseCode,
    //       courseName: req.body.courseName,
    //       facultyId: toStoreFaculty,
    //       bio: req.body.bio,
    //       status: status,
    //     });
    //
    //     newCourse.save().then(course => res.json(course)).catch(err => res.json(errors));
    //   }
    // })
});

//@unAssigned Faculty
router.get('/unAssignedFaculty',passport.authenticate('hod',{session: false}),
  (req,res) => {
    User.find({role: 'faculty', assigned: false}).then(faculty => {
      Department.findOne({hod: req.user._id}).then(department => {
        if(faculty) {
          res.json({department,faculty});
        }else {
          res.json({noUnAssignedFaculty: 'All faculty are assigned at least one of the courses',department})
        }
      }).catch(err => res.status(404).json({ noPostsFound: 'No Department found' }))
    }).catch(err => res.status(404).json({notFound: 'faculty not found'}))
});

module.exports = router;

