const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Mongo Model
const Question = require('../../models/Question');
const User = require('../../models/User');

const validateCommentInput = require('../../validations/addComments');

//@Comment On Question
router.post('/question/:id',passport.authenticate('all',{session: false}),
  (req,res) => {
  const {errors, isValid} = validateCommentInput(req.body);
  if(!isValid) {
    return res.status(404).json(errors);
  }
  Question.findById(req.params.id)
    .then(question => {
      const newComment = {
        text: req.body.text,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.body.avatar,
        userId: req.user._id
      };
      question.comments.unshift(newComment);
      question.save().then(question => res.json(question));
    })
    .catch(err => res.status(404).json({ postNotFound: 'No Question found to comment on'}));
});

//@comments on Answers
router.post('/answer/:id/:answerId',passport.authenticate('all',{session: false}),
  (req,res) => {
  const {errors,isValid} = validateCommentInput(req.body);
    if(!isValid) {
      return res.status(404).json(errors);
    }
    console.log(req.params.id);
    Question.findById(req.params.id)
      .then(question => {
        let ansId = {};
        if (question.answer.filter(answer => answer._id.toString() === req.params.answerId).length === 0) {
         return res
           .status(404)
           .json({ answerNotExist: 'Answer does not exist' });
       }
        const ans = question.answer
          .map(item => item._id.toString())
          .indexOf(req.params.answerId);
            const newAnswerComment = {
              text: req.body.text,
              firstName: req.user.firstName,
              lastName: req.user.lastName,
              avatar: req.body.avatar,
              userId: req.user._id
            };
        question.answer[ans].comments.unshift(newAnswerComment);
            question.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({noQuestion: 'This question does not exist'}))
  });
module.exports = router;