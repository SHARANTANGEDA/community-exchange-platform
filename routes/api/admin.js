const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const validateLoginInput = require('../../validations/login/adminLogin')
const validateDepartmentInput = require('../../validations/validateDepartment')
const User = require('../../models/User')
const Department = require('../../models/Department')
const Question = require('../../models/Question')

//@desc Register
router.post('/register', (req, res) => {

  User.findOne({ emailId: req.body.emailId }).then(user => {
    if (user) {
      errors.emailId = 'Account already exists please use your password to login'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.emailId, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'retro' // Default
      })
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        avatar,
        password: req.body.password,
        isTA: false,
        role: 'admin',
        reputation: 0
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, avatar: user.avatar, role: user.role }
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
    }
  })
})

//admin Login
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
        const payload = { id: user.id, role: user.role, avatar: user.avatar }
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

//@ Create Question
router.post('/addDepartment', passport.authenticate('admin', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDepartmentInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const avatar = gravatar.url(req.body.emailId, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'retro' // Default
    })

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      avatar,
      password: req.body.password,
      departmentName: req.body.departmentName,
      role: 'hod'
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then(user => {
            const newDepartment = new Department({
              hod: user._id,
              hodEmail: req.body.emailId,
              departmentName: req.body.departmentName
            })
            newDepartment.save().then(department => res.json(department))
          })
          .catch(err => console.log(err))
      })
    })
  })

router.get('/adminCards', passport.authenticate('admin', { session: false }), (req, res) => {
  let noOfStudents = 0, noOfFaculty = 0, noOfDepartments = 0, noOfQuestions = 0
  User.find().then(users => {
    noOfStudents = users.filter(student => student.role === 'student').length
    noOfFaculty = users.filter(faculty => faculty.role === 'faculty').length
    noOfDepartments = users.filter(hod => hod.role === 'hod').length
    Question.find().then(questions => {
      noOfQuestions = questions.length
      res.json({ students: noOfStudents, faculty: noOfFaculty, departments: noOfDepartments, questions: noOfQuestions })
    }).catch(err => {
      res.json({ students: noOfStudents, faculty: noOfFaculty, departments: noOfDepartments, questions: 0 })
    })
  }).catch(err => {
    res.json({ students: 0, faculty: 0, departments: 0, questions: 0 })
  })
})
router.get('/adminGraphs', passport.authenticate('admin', { session: false }), (req, res) => {
  let questionsArray = new Array(8).fill(0),dummy=[],
    weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
    days=[]
  Question.find().sort({ time: -1 }).then(async questions => {
    const dateDiffInDays = (a, b) => {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
      return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24))
    }
    let now = new Date()
    console.log(now.getDay());
    dummy.push(new Promise((resolve,reject) => {
      for (let i = 6; i >= 1; i--) {
        if(now.getDay()-i>=0) {
          days.push(weekdays[now.getDay()-i]);
        } else {
          days.push(weekdays[now.getDay()+7-i])
        }
      }
      days.push(weekdays[now.getDay()])
    }))
    questions.map(question => {
      dummy.push(new Promise((resolve, reject) => {
        if (dateDiffInDays(now, new Date(question.time)) < 7) {
          questionsArray[dateDiffInDays(now, new Date(question.time))]++
          resolve(question.time)
        }
      }))
    })
    questionsArray.reverse()
    console.log({ series:await Promise.all(questionsArray),labels : await Promise.all(days)})
    res.json({ series:await Promise.all(questionsArray),labels : await Promise.all(days)})

  }).catch(err => {
    res.json({ notFound: 'No Question Found' })
  })
})
router.get('/noOfCoursesInDep',passport.authenticate('admin', { session: false }),
  (req, res) => {
  let data=[];
  Department.find().then(async departments => {
    departments.map(department => {
      data.push(new Promise((resolve,reject) => {
        resolve({department,noOfCourses:department.courses.length})
      }))
    })
    res.json({table: await Promise.all(data)})
  }).catch(err => {
    res.json({notFound: 'notFound'})
  })
})
module.exports = router