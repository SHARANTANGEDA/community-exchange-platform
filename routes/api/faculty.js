const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const validateRegisterInput = require('../../validations/register/registerFaculty')
const validateLoginInput = require('../../validations/login/facultyLogin')
const validatePassword = require('../../validations/password')
const validateProfileInput = require('../../validations/profile')
const Question = require('../../models/Question')
const User = require('../../models/User')
const Department = require('../../models/Department')

//@desc Register
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ emailId: req.body.emailId }).then(faculty => {
    if (faculty) {
      errors.emailId = 'Account already exists please use your password to login'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'retro' // Default
      })

      const newFaculty = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        avatar,
        password: req.body.password,
        departmentName: req.body.departmentName,
        role: 'faculty'
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newFaculty.password, salt, (err, hash) => {
          if (err) throw err
          newFaculty.password = hash
          newFaculty
            .save()
            .then(user => {
              const payload = { id: user.id, avatar: user.avatar ,assigned:user.assigned}
              //TODO change secret key and signIn options
              jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
                (err, token) => {
                  res.json({
                    user,
                    success: true,
                    token: 'Bearer ' + token
                  })
                })
            })
            .catch(err => console.log(err))
        })
      })
      //TODO uncomment below lines to implement mail verification
      // const verifyToken = new VerifyToken({
      //     _userId: user._id,
      //     token:crypto.randomBytes(16).toString('hex')
      //   });
      // verifyToken.save().then(token => res.json(token))
      //   .catch(err => console.log(err));
      // // Send the email
      // const transporter = nodemailer.createTransport({ service: 'Sendgrid', authorization: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      // const mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification' +
      //     ' Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
      // transporter.sendMail(mailOptions, err => {
      //   if (err) { return res.status(500).send({ msg: err.message }); }
      //   res.status(200).send('A verification email has been sent to ' + user.email + '.');
      // });
    }
  })
})

//@desc Login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const emailId = req.body.emailId
  const password = req.body.password

  User.findOne({ emailId }).then(user => {

    if (!user) {
      errors.emailId = 'User not Found'
      return res.status(400).json(errors)
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id,role: user.role,avatar: user.avatar,assigned:user.assigned}
        //TODO change secret key and signIn options
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
      } else {
        errors.password = 'Incorrect Password'
        return res.status(400).json(errors)
      }
    })
  })
})


router.get('/myCourses',passport.authenticate('faculty',{session: false}),(req,res) => {

    let courses=[];
    User.findById(req.user._id).then(faculty => {
      if(!faculty.assigned) {
        res.json({ notAssigned: 'You have not been assigned any course Yet' });
      } else {
        faculty.courses.forEach(courseCode => {
          Department.findOne({departmentName: faculty.departmentName}).then(department => {
            let myCourse = department.courses.filter(course => {course.courseCode.trim()===courseCode.trim()});
            courses.push(myCourse)
          }).catch(err => res.json({dataInconsistent: 'The data is In Consistent please try again' +
              ' or contact us'}))
        })
        res.json(courses);
      }

    });
})

router.get('/applications',passport.authenticate('faculty', {session: false}),
  (req,res)  => {
  User.findById(req.user._id).then(faculty => {
    if(!faculty.assigned) {
      console.log('In not assigned')
      res.json({faculty,notAssigned: 'You should be assigned to a course to receive TA application'})
    }
  })
  User.findById(req.user._id).then(async faculty => {
    console.log('In faculty')
      let display=[];
      faculty.courses.forEach(courseId => {
        display.push(new Promise((resolve, reject) => {
          User.find({ applyTA: true, taCourse: courseId.trim(), role: 'student' }).then(student => {
            resolve({ courseCode: courseId, students: student })
          }).catch(err => reject({ faculty, notFound: 'No Applicants Found' }))
        })
  )})
      res.json({applications:await Promise.all(display)});
  }).catch(err => {
    console.log('In error')
    res.status(404).json({facultyNotFound: 'faculty not found'})})
})

//ACCEPT TA APPLICATION
router.post('/applications/accept/:id',passport.authenticate('faculty',{session: false}),
  (req,res) => {
    User.findByIdAndUpdate(req.params.id,{applyTA: false, isTA: true},{new: true})
      .then(user => {
        res.json({success: 'Successfully Added TA'})
      }).catch(err => res.status(401).json({error: 'Error Accepting try again in sometime'}))
})

//REJECT TA APPLICATION
router.post('/applications/reject/:id',passport.authenticate('faculty',{session: false}),
  (req,res) => {
    User.findByIdAndUpdate(req.params.id,{applyTA: false, taCourse:null},{new: true})
      .then(user => {
        res.json({success: 'Rejected TA application'})
      }).catch(err => res.status(401).json({error: 'Error Rejecting try again in sometime'}))
})

//GET COURSE QUESTIONS
router.get('/courseQuestions/:id',passport.authenticate('faculty',{session: false}),
  (req,res) => {

})
router.get('/getTAs',passport.authenticate('faculty',{session: false},
  (req,res) => {
    User.findById(req.user._id).then(faculty => {
      if(!faculty.assigned) {
        res.status(401).json({notAssigned: 'You should be assigned to a course to receive TA application'})
      }else {
        let display=[];
        faculty.courses.forEach(courseId => {
          User.find({isTA: true,taCourse: courseId,role: 'student'}).then(student => {
            display.push({courseCode: courseId,students: student});
          }).catch(err => res.status(404).json({notFound: 'No Applicants Found'}))
        })
        res.json(display);
      }
    })
}));
router.get('deleteTA/:id',passport.authenticate('faculty',{session: false}),
  (req,res) => {
  User.findByIdAndUpdate(req.params.id,{isTA: false,applyTA: false,taCourse: []}).then(user => {
    res.json({success: 'Successfully deleted TA'})
  }).catch(err => res.status(401).json({error: 'There was error in removing TA'}))
})

router.get('/home',passport.authenticate('faculty', {session: false}),(req,res) => {
  let defQuestions=[];
  if(!req.user.assigned) {
    Question.find().sort({time: -1})
      .limit(10).then(questions => {
         res.json({NotAssigned: true, questions})
      })
  } else {

    Question.find()
      .sort({ time: -1 })
      .limit(10)
      .then(questions => {
        defQuestions = questions;
      }).catch(err => res.status(404).json({ noPostsFound: 'No posts found' }))
    User.findById(req.user._id).then(async faculty => {
      let display = [];

      faculty.courses.map(course => {
        display.push(new Promise((resolve, reject) => {
          Question.find({ course: course.trim() }).sort({ time: -1 }).limit(5).then(questions => {
            if (questions.length === 0) {
              resolve({ course, questions, none: true })
            } else {
              resolve({ course, questions, none: true })
            }
          }).catch(err => {
            reject(Question.find().then(questions => {
                res.json(questions)
              }).catch(err => res.status(404).json(
              { noFound: 'No question is found based on this course' }))
            )
          })
        }))
      })

      res.json({ data: await Promise.all(display), NotAssigned: false });

    }).catch(err => res.status(404).json(
      { noFound: 'No question is found based on this course' }));
  }
})
module.exports = router
