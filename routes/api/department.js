const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');

//Mongo Model
const Department = require('../../models/Department');
const User = require('../../models/User');

const validateQuestionInput = require('../../validations/askQuestions')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//TODO set hod home page
router.get('/home',passport.authenticate('hod',{session: false}),(req,res) => {
  Department.find({hod: req.user._id})
    .then(department =>{
      User.find({departmentName: department.departmentName,role: 'faculty'}).then(faculty => {
        res.json({department,faculty})
      }).catch(err => res.json({noFaculty: 'There are no faculty in this department',department}))
    }).catch(err => res.status(404).json({noPostsFound: 'No posts found'}));
});
//@get Question by Id
router.get('/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
  Department.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => {
      res.status(404).json({noPostFound: 'No post found with that ID'});
    });
});

//@ Create Question
router.post('/ask',passport.authenticate('jwt',{session: false}),
  (req,res) => {
    const {errors , isValid} =validateQuestionInput(req.body);
    if(!isValid) {
      return res.status(400).json(errors);
    }
    let toStoreTag = req.body.tags.trim();
    if(toStoreTag.endsWith(',')) {
      toStoreTag = toStoreTag.substr(0,toStoreTag.length-1);
    }
    const newQuestion = new Question({
      title: req.body.title,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      tags: toStoreTag,
      description: req.body.description,
      avatar: req.user.avatar,
      userId: req.user._id,
      user: req.user._id
    });

    newQuestion.save().then(question => res.json(question)).catch(err => res.json(errors));
  }
);

//@Delete Question by Id path:api/question/:id
router.delete(
  '/:id',passport.authenticate('jwt',{session: false}),
  (req,res) => {
    User.findOne({user: req.user.id}).then(user => {
      Question.findById(req.params.id)
        .then(question => {
          if(question.user.toString()!==req.user.id) {
            return res.status(401).json({notAuthorized: 'User not authorized'});
          }
          question.remove().then(() =>res.json({success: true}));
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    });
  }
);

module.exports = router;

