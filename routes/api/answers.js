const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Mongo Model
const Question = require('../../models/Question');
const User = require('../../models/User');

const validateAnswerInput = require('../../validations/answerQuestion');


//@Answer Question
router.post(
  '/answer/:id',passport.authenticate('student',{session: false}),
  (req,res) => {
    const {errors, isValid} = validateAnswerInput(req.body);
    if(!isValid) {
      return res.status(400).json(errors);
    }

    Question.findById(req.params.id)
      .then(question => {
        const newAnswer = {
          text: req.body.text,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          avatar: req.user.avatar,
          userId: req.user._id
        };
        question.answer.unshift(newAnswer);
        question.save().then(question => res.json(question));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Question found to answer'}));
  }
);

//@delete Answer
router.delete(
  '/:id/:answer_id',
  passport.authenticate('student', { session: false }),
  (req, res) => {
    Question.findById(req.params.id)
      .then(question => {
        // Check to see if comment exists
        if (
          question.answer.filter(
            answer => answer._id.toString() === req.params.answer_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ answerNotExists: 'Answer does not exist' });
        }

        // Get remove index
        const removeIndex = question.answer
          .map(item => item._id.toString())
          .indexOf(req.params.answer_id);

        // Splice answer out of array
        question.answer.splice(removeIndex, 1);

        question.save().then(question => res.json(question));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No post found',err }));
  }
);
module.exports = router;