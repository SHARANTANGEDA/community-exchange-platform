const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const validateRegisterInput = require('../../validations/register')
const validateLoginInput = require('../../validations/login')
const validatePassword = require('../../validations/password')
const User = require('../../models/User')
const Question = require('../../models/Question')

//@desc Register
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ emailId: req.body.emailId }).then(user => {
    if (user) {
      errors.emailId = 'Account already exists please use your password to login'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      })

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        avatar,
        password: req.body.password,
        departmentName: req.body.departmentName
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
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
        const payload = { id: user.id, avatar: user.avatar }
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
router.get('/myAccount', passport.authenticate('jwt', { session: false }),
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
                    githubUsername: req.user.githubUsername,
                    avatar: req.user.avatar,
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
router.post('/myAccount/change', passport.authenticate('jwt', { session: false }),
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
            User.findByIdAndUpdate(req.user._id, { password: newPassword }, (err, res) => {
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

//Change github handle
router.post('/myAccount/gitUsername', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.body.githubUsername !== req.user.githubUsername) {
      User.findByIdAndUpdate(req.user._id, { githubUsername: req.body.githubUsername }, (err, res) => {
        if (err) throw err
      }).then(user => {
        res.json({ githubUsername: user.githubUsername })
      }).catch(err => {
        return res.status(404).json({ failed: 'userName failed to Update', err })
      })
    } else {
      return res.json({ failed: 'userName is stored already enter other name to change' })
    }
  })

module.exports = router