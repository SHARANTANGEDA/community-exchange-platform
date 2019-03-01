const express = require('express')
const router = express.Router()
const app = express()
const passport = require('passport')
const bodyParser = require('body-parser')

const Question = require('../../models/Question')
const User = require('../../models/User')
//const Profile = require('../../models/Profile');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*@all profiles*/
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.find({}, {
    'firstName': 1, 'lastName': 1, 'emailId': 1, 'avatar': 1, 'departmentName': 1, 'githubUsername': 1
  })
    .then(users => {
      if (!users) {
        errors.noprofile = 'There are no profiles'
        return res.status(404).json(errors)
      }
      // const display = {
      //   full_name: user.firstName + ' ' + user.lastName,
      //   department: user.departmentName,
      //   avatar: user.avatar,
      //   emailId: user.emailId,
      // }
      res.json(users)
    }).catch(err => res.status(404).json(err))
})

//@ profile by emailId
router.get('/emailId/:id', (req, res) => {
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
router.get('/:id', (req, res) => {
  const errors = {};
  User.findById(req.params.id, {
    'firstName': 1, 'lastName': 1, 'emailId': 1, 'avatar': 1, 'departmentName': 1, 'githubUsername': 1,
    '_id': 0
  })
    .then(user => {
      if (!user) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }
      Question.find({user: req.params.id},{'title': 1, 'tags': 1, 'description': 1, 'time': 1,'firstName': 1
        ,'lastName': 1,'avatar':1,  '_id': 0})
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
