const express = require('express')
const router = express.Router()
const keys = require('../../config/keys')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')

/* GET Google Authentication API. */
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res)=> {
    let token = req.user.token;
    let emailId = req.user.emailId;

    User.findOne({emailId: emailId }).then(user => {

      if (!user) {
        const avatar = gravatar.url(emailId, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'retro' // Default
        })
        const newUser = new User({
          firstName: 'googleUser',
          lastName: 'googleUser',
          emailId: emailId,
          avatar,
          password: 'THIS IS GOOGLE STUFF',
          departmentName: 'GOOGLE TEST',
          isTA: false,
          role: 'student'
        })
        newUser
          .save()
          .then(user => {
            const payload = { id: user.id, avatar: user.avatar, role: user.role }
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
      }
      else {
        const payload = { id: user.id, avatar: user.avatar, role: user.role }
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
      }
    })
    //res.redirect("http://localhost:3000?token=" + token);

  }
);