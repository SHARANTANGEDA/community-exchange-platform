const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const validateRegisterInput = require('../../validations/register/registerFaculty')
const validateLoginInput = require('../../validations/login/login')
const validatePassword = require('../../validations/password')
const validateProfileInput = require('../../validations/profile')
const Question = require('../../models/Question')

//@desc Register
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  Faculty.findOne({ emailId: req.body.emailId }).then(faculty => {
    if (faculty) {
      errors.emailId = 'Account already exists please use your password to login'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      })

      const newFaculty = new Faculty({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        avatar,
        password: req.body.password,
        departmentName: req.body.departmentName
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newFaculty.password, salt, (err, hash) => {
          if (err) throw err
          newFaculty.password = hash
          newFaculty
            .save()
            .then(faculty => {
              const payload = { id: faculty.id, avatar: faculty.avatar }
              //TODO change secret key and signIn options
              jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
                (err, token) => {
                  res.json({
                    faculty,
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

  Faculty.findOne({ emailId }).then(faculty => {

    if (!faculty) {
      errors.emailId = 'User not Found'
      return res.status(400).json(errors)
    }

    bcrypt.compare(password, faculty.password).then(isMatch => {
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
    const userId=req.faculty._id;
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
                    firstName: req.faculty.firstName,
                    lastName: req.faculty.lastName,
                    email: req.faculty.emailId,
                    departmentName: req.faculty.departmentName,
                    website: req.faculty.website,
                    avatar: req.faculty.avatar,
                    linkedIn: req.faculty.linkedIn,
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
router.post('/changePassword', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePassword(req.body)
    if (!isValid) {
      res.status(404).json(errors)
    }
    const password = req.body.password
    let newPassword = req.body.newPassword
    bcrypt.compare(password, req.faculty.password).then(isMatch => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err
            newPassword = hash
            Faculty.findOneAndUpdate({_id: req.faculty._id}, { password: newPassword }, (err, res) => {
              if (err) throw err
            }).then(faculty => {
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

//Update Profile CodeForces, Github, linkedIn
router.post('/myAccount/change', passport.authenticate('jwt', { session: false }),
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
    Faculty.findOneAndUpdate(
      { _id: req.faculty._id },
      { $set: profileFields },
      {new: true}
    ).then(faculty => {
      res.json(faculty)
    });
  }
);
module.exports = router