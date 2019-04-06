const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const validateLoginInput = require('../../validations/login/adminLogin')
const validateDepartmentInput=require('../../validations/validateDepartment')
const User = require('../../models/User')
const Department = require('../../models/Department')

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
        role: 'admin'
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, avatar: user.avatar ,role: user.role}
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


//@ Create Question
router.post('/addDepartment',passport.authenticate('admin',{session: false}),
  (req,res) => {
    const {errors , isValid} =validateDepartmentInput(req.body);
    if(!isValid) {
      return res.status(400).json(errors);
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
              hod:user._id,
              departmentName: req.body.departmentName
            })
            newDepartment.save().then(department => res.json({success: 'Department successfully created'}))
          })
          .catch(err => console.log(err))
      })
    })

  });



module.exports = router