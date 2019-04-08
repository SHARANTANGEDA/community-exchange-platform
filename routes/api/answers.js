const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Mongo Model
const Question = require('../../models/Question');
const User = require('../../models/User');

const validateAnswerInput = require('../../validations/answerQuestion');


//Down Vote an answer
router.post('/downVote/:id/:answerId',passport.authenticate('all',{session: false}),(req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Question.findById(req.params.id)
      .then(question => {
        const index = question.answer
          .map(item => item._id.toString())
          .indexOf(req.params.answerId);
        if (question.answer[index].downVote.filter(downVote => downVote.user.toString() === req.user.id)
          .length > 0) {
          return res
            .status(400)
            .json({ alreadyLiked: 'Already down-voted this answer' });
        }
        // Add user id to likes array
        question.answer[index].downVote.unshift({ user: req.user.id });
        User.findByIdAndUpdate(question.answer[index].user,{ $inc: {reputation:-2}},{new: true})
          .then(user => {
            question.save().then(question => {res.json(question)});
          })
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Question found' }));
  });
});

// UpVote an answer
router.post('/upVote/:id/:answerId',passport.authenticate('all',{session: false}),(req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Question.findById(req.params.id)
      .then(question => {
        const index = question.answer
          .map(item => item._id.toString())
          .indexOf(req.params.answerId);
        if (question.answer[index].upVote.filter(upVote => upVote.user.toString() === req.user.id)
          .length > 0) {
          return res
            .status(400)
            .json({ alreadyLiked: 'Already up-voted this answer' });
        }
        // Add user id to likes array
        question.answer[index].upVote.unshift({ user: req.user.id });
        User.findByIdAndUpdate(question.answer[index].user,{ $inc: {reputation:2}},{new: true})
          .then(user => {
            question.save().then(question => {res.json(question)});
          })
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Question found' }));
  });
});

//Mark Answer as helpful
router.post('/markAsHelpful/:id/:answerId',
  passport.authenticate('all',{session:false}),(req,res) => {
  let index=-1;
  Question.findById(req.params.id).then(question => {
    index = question.answer
      .map(item => item._id.toString())
      .indexOf(req.params.answerId);
    if(question.answer[index].markAsHelpful) {
      return res
        .status(400)
        .json({ alreadyDone: 'Already marked as helpful' })
    } else {
      question.answer[index].markAsHelpful=true;
      question.save().then(question => res.json(question));
    }
  })
})
//@Answer Question
router.post(
  '/answer/:id',passport.authenticate('all',{session: false}),
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
  passport.authenticate('all', { session: false }),
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