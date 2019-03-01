const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

//Mongo Model
const Question = require('../../models/Question');
const User = require('../../models/User');

const validateQuestionInput = require('../../validations/askQuestions')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//@get Questions for display
router.get('/',passport.authenticate('jwt',{session: false}),(req,res) => {
  Question.find()
    .sort({time: -1})
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json({noPostsFound: 'No questions found'}));
});

//@Get 10 Questions for display
router.get('/home',passport.authenticate('jwt',{session: false}),(req,res) => {
  Question.find()
    .sort({time: -1})
    .limit(10)
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json({noPostsFound: 'No posts found'}));
});
//@get Question by Id
router.get('/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
  Question.findById(req.params.id)
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
  const newQuestion = new Question({
    title: req.body.title,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    tags: req.body.tags,
    description: req.body.description,
    avatar: req.user.avatar,
    user: req.user.id
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

