const express = require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const questions = require('./routes/api/questions');
const answers = require('./routes/api/answers');
const comments = require('./routes/api/comments')

//@MongoDB Atlas Connection
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware and Config
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users',users);
app.use('/api/questions',questions);
app.use('/api/answers',answers);
app.use('/api/comments',comments)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
