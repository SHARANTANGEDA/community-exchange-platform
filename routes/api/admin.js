const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const bcrypt = require('bcryptjs')

const validateLoginInput = require('../../validations/login/adminLogin')
const Admin = require('../../models/Admin')


//@desc Login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const emailId = req.body.emailId
  const password = req.body.password

  Admin.findOne({ emailId }).then(admin => {

    if (!admin) {
      console.log({admin})
      errors.emailId = 'Admin not Found'
      return res.status(400).json(errors)
    }

    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        //TODO unComment below lines to implement mail verification

        // if(!user.isVerified) {
        //   return res.status(401).json({type: not-Verified, msg: 'Your account is not verified'});
        // }
        const payload = { id: admin.id, avatar: admin.avatar }
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



module.exports = router