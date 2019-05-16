const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const multer = require('multer');

//Mongo Model
const Question = require('../../models/Question');
const User = require('../../models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const validateQuestionInput = require('../../validations/askQuestions')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/downVote/:id',passport.authenticate('all',{session: false}),(req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Question.findById(req.params.id)
      .then(question => {
        if (question.downVote.filter(downVote => downVote.user.toString() === req.user.id)
            .length > 0) {
          return res
            .status(400)
            .json({ alreadyLiked: 'Already down-voted this post' });
        }
        // Add user id to likes array
        question.downVote.unshift({ user: req.user.id });
        User.findByIdAndUpdate(question.user,{ $inc: {reputation:-1}},{new: true})
          .then(user => {
            question.save().then(question => {res.json(question)});
          })
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Question found' }));
  });
});

// UpVote a question
router.post('/upVote/:id',passport.authenticate('all',{session: false}),(req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Question.findById(req.params.id)
      .then(question => {
        if (question.upVote.filter(upVote => upVote.user.toString() === req.user.id)
          .length > 0) {
          return res
            .status(400)
            .json({ alreadyLiked: 'Already up-voted this post' });
        }
        // Add user id to likes array
        question.upVote.unshift({ user: req.user.id });
        User.findByIdAndUpdate(question.user,{ $inc: {reputation:1}},{new: true})
          .then(user => {
            question.save().then(question => {res.json(question)});
          })

      })
      .catch(err => res.status(404).json({ postNotFound: 'No Question found' }));
  });
});
//@get Questions for display
router.get('/',passport.authenticate('all',{session: false}),(req,res) => {
  Question.find()
    .sort({time: -1})
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json({noPostsFound: 'No questions found'}));
});

//@Get 10 Questions for display
router.get('/home',passport.authenticate('student',{session: false}),(req,res) => {
  Question.find()
    .sort({time: -1})
    .limit(10)
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json({noPostsFound: 'No posts found'}));
});
//@get Question by Id
router.get('/:id',passport.authenticate('all',{session: false}),(req,res) => {
  Question.findById(req.params.id)
    .then(question => {
      if (question.views.filter(views => views.user.toString() === req.user.id)
        .length > 0) {
        return res.json(question);
      }
      question.views.unshift({ user: req.user.id });
      question.save().then(question => {res.json(question)});
    })
    .catch(err => res.status(404).json({ postNotFound: 'No Question found' }));
});


//@ Create Question
router.post('/ask',passport.authenticate('all',{session: false}),
  (req,res) => {
  const {errors , isValid} =validateQuestionInput(req.body);
    let toStoreTag = req.body.tags,image=[];
    if(toStoreTag.endsWith(',')) {
      toStoreTag = toStoreTag.substr(0,toStoreTag.length-1);
    }
    if(toStoreTag.startsWith(',')) {
      toStoreTag = toStoreTag.substr(1,toStoreTag.length);
    }
    if(toStoreTag.length===0) {
      errors.tags = 'Please enter tags in proper format'
    }
    toStoreTag=toStoreTag.split(',');
    toStoreTag.forEach(tag => {
      const pat = /^[a-zA-Z]+$/;
      tag=tag.trim();
      if(tag.length===0) {
        errors.tags='tags cannot be empty';
      }
      if(!pat.test(tag)) {
        errors.tags = 'tags cannot contain special characters'
      }
    })
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const newQuestion = new Question({
    title: req.body.title,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    tags: toStoreTag,
    description: req.body.description,
    avatar: req.user.avatar,
    userId: req.user._id,
    user: req.user._id,
    course:req.body.course,
  });
  console.log("Question is being saved")
  newQuestion.save().then(question => {
    console.log(question)
    res.json(question)
  }).catch(err => {
    console.log(err)
    res.json(errors)
  });
  });




//@Delete Question by Id path:api/question/:id
router.delete(
  '/:id',passport.authenticate('student',{session: false}),
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

