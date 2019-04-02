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
const Course = require('../../models/Course')

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
        d: 'mm' // Default
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
              const payload = { id: user.id, avatar: user.avatar }
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
        //TODO unComment below lines to implement mail verification
        // if(!user.isVerified) {
        //   return res.status(401).json({type: not-Verified, msg: 'Your account is not verified'});
        // }
        const payload = { id: user.id,role: user.role,avatar: user.avatar}
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

//Logged In Session currentUser
router.get('/myAccount', passport.authenticate('faculty', { session: false }),
  (req, res) => {
    let activity = {};
    const userId=req.user._id;
    Question.find({ user: userId }, { 'title': 1, 'tags': 1, 'description': 1, 'time': 1, '_id': 0 })
      .then(questions => {
        if (!questions) {
        } else {
          activity.questions = questions;
          Question.find({ 'comments.user': userId }, {
            'title': 1,
            'tags': 1,
            'comments.text': 1,
            'comments.time': 1,
            'time': 1,
            '_id': 0
          }).then(comments => {
            if (!comments) {
            } else {
              activity.comments = comments;
              Question.find({ 'answer.user': userId }, {
                'title': 1,
                'tags': 1,
                'time': 1,
                '_id': 0,
                'answer.text': 1,
                'answer.time': 1
              }).then(answers => {
                if (!answers) {
                } else {
                  activity.answers = answers;
                  res.json({
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    email: req.user.emailId,
                    departmentName: req.user.departmentName,
                    website: req.user.website,
                    avatar: req.user.avatar,
                    linkedIn: req.user.linkedIn,
                    questionsAsked: activity.questions,
                    questionsAnswered: activity.answers,
                    questionsCommented: activity.comments
                  })
                }
              }).catch(err => {
                return res.status(404).json({ err })
              })
            }
          }).catch(err => {
            return res.status(404).json({ err })
          })
        }
      }).catch(err => {
      return res.status(404).json({ err })
    })




  })

//Change Password
router.post('/changePassword', passport.authenticate('faculty', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePassword(req.body)
    if (!isValid) {
      res.status(404).json(errors)
    }
    const password = req.body.password
    let newPassword = req.body.newPassword
    bcrypt.compare(password, req.user.password).then(isMatch => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err
            newPassword = hash
            User.findOneAndUpdate({_id: req.user._id}, { password: newPassword }, (err, res) => {
              if (err) throw err
            }).then(user => {
              res.json({ success: 'password is changed successfully' })
            }).catch(err => {
              return res.status(404).json({ failed: 'Your password is not updated', err })
            })
          })
        })
      } else {
        errors.password = 'Incorrect Password'
        return res.status(400).json(errors.password)
      }
    })
  })

//Update Profile
router.post('/myAccount/change', passport.authenticate('faculty', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    console.log({body: req.body})
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    // TODO Skills
    // if (typeof req.body.skills !== 'undefined') {
    //   profileFields.skills = req.body.skills.split(',');
    // }
    // if (req.body.codeForces) {
    //   profileFields.codeForces = req.body.codeForces;
    // }
    if (req.body.linkedIn) profileFields.linkedIn = req.body.linkedIn;
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: profileFields },
      {new: true}
    ).then(user => {
      res.json(user)
    });
  }
);

router.get('/myCourses',passport.authenticate('faculty',{session: false}),(req,res) => {

    let courses=[];
    User.findById(req.user._id).then(faculty => {
      if(!faculty.assigned) {
        res.json({notAssigned:'You have not been assigned any course Yet'});
      }else {
        faculty.courses.forEach(courseCode => {
         Course.findOne({courseCode: courseCode}).then(course => {
          let showCourse = {
            courseCode: course.courseCode,
            courseName: course.courseName,
            bio: course.bio
          }
          courses.push(showCourse);
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
      res.status(401).json({notAssigned: 'You should be assigned to a course to receive TA application'})
    }else {
      let display=[];
      faculty.courses.forEach(courseId => {
        User.find({applyTA: true,taCourse: courseId,role: 'student'}).then(student => {
          display.push({courseCode: courseId,students: student});
        }).catch(err => res.status(404).json({notFound: 'No Applicants Found'}))
      })
      res.json(display);
    }
  })
})

//ACCEPT TA APPLICATION
router.get('/applications/:id/accept',passport.authenticate('faculty',{session: false}),
  (req,res) => {
    User.findByIdAndUpdate(req.params.id,{applyTA: false, isTA: true},{new: true})
      .then(user => {
        res.json({success: 'Successfully Added TA'})
      }).catch(err => res.status(401).json({error: 'Error Accepting try again in sometime'}))
})

//REJECT TA APPLICATION
router.get('/applications/:id/reject',passport.authenticate('faculty',{session: false}),
  (req,res) => {
    User.findByIdAndUpdate(req.params.id,{applyTA: false, taCourse:[]},{new: true})
      .then(user => {
        res.json({success: 'Rejected TA application'})
      }).catch(err => res.status(401).json({error: 'Error Rejecting try again in sometime'}))
})

//GET COURSE QUESTIONS
router.get('/courseQuestions/:id',passport.authenticate('faculty',{session: false}),
  (req,res) => {
    Question.find({course: req.params.id}).then(questions => {
      res.json(questions)
    }).catch(err => res.status(404).json(
      {noFound: 'No question is found based on this course'}));
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
  User.findById(req.user._id).then(faculty => {
      let display=[];
      if(faculty.courses.length===0) {
        throw 'err';
      }
      faculty.courses.forEach(course => {
        Question.find({course: course}).sort({time: -1}).limit(5).then(questions => {
          display.push({course,questions});
        }).catch(err => {
          Question.find()
            .sort({time: -1})
            .limit(10)
            .then(questions => {
              res.json({NotAssigned: 'You are not assigned any course yet',questions})
            }).catch(err => res.status(404).json({noPostsFound: 'No posts found'}))
        })
      })
      res.json({data:display});
    }).catch(err => {
      Question.find()
    .sort({time: -1})
    .limit(10)
    .then(questions => {
      res.json({NotAssigned: 'You are not assigned any course yet',questions})
    }).catch(err => res.status(404).json({noPostsFound: 'No posts found'}));})
})
module.exports = router