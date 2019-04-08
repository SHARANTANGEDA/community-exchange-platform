const express = require('express')
const router = express.Router()
const app = express()
const passport = require('passport')
const bodyParser = require('body-parser')

const Question = require('../../models/Question')
const User = require('../../models/User')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*@all profiles*/
router.get('/', passport.authenticate('all', { session: false }), (req, res) => {
  User.find({$or:[{'role':'faculty'},{'role': 'student' },{'role': 'hod'}]}, {
    'firstName': 1, 'lastName': 1, 'emailId': 1, 'avatar': 1, 'departmentName': 1, 'githubUsername': 1, 'role': 1,
    'reputation': 1
  })
    .then(users => {
      if (!users) {
        errors.noprofile = 'There are no profiles'
        return res.status(404).json(errors)
      }
      res.json(users)
    }).catch(err => res.status(404).json(err))
})

//@ profile by emailId
router.get('/emailId/:id',passport.authenticate('all', { session: false }), (req, res) => {
  const errors = {}
    User.findOne({ emailId: req.params.id }, {
      'firstName': 1, 'lastName': 1, 'emailId': 1, 'avatar': 1, 'departmentName': 1, 'githubUsername': 1,
    })
      .then(user => {
        if (!user) {
          errors.noprofile = 'There is no profile for this user'
          res.status(404).json(errors)
        }
        Question.find({user: user._id},{'title': 1, 'tags': 1, 'description': 1, 'time': 1,'firstName': 1
          ,'lastName': 1,'avatar':1, '_id': 0})
          .then(questions => {
            if(!questions) {
              res.json(user);
            }else {
              res.json({user,questions});
            }
          })
      })
      .catch(err => res.status(404).json(err))
});

//@ profile by userId
router.get('/:id',passport.authenticate('all', { session: false }), (req, res) => {
  const errors = {};
  User.findById(req.params.id, {
    'firstName': 1, 'lastName': 1, 'emailId': 1, 'avatar': 1, 'departmentName': 1, 'githubUsername': 1,
    '_id': 0,'role': 1,'reputation': 1
  })
    .then(user => {
      if (!user) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }
    // ,{'title': 1, 'tags': 1, 'description': 1, 'time': 1,'firstName': 1
    //     ,'lastName': 1,'avatar':1,'userId':1}
      Question.find({userId: req.params.id})
        .then(questions => {
          if(!questions) {
            res.json(user);
          }else {
            res.json({user,questions});
          }
        })
    })
    .catch(err => res.status(404).json(err))
});

module.exports = router;
