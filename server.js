const express = require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const questions = require('./routes/api/questions');
const answers = require('./routes/api/answers');
const comments = require('./routes/api/comments')
const publicProfile = require('./routes/api/publicProfile');
const admin = require('./routes/api/admin');
const faculty = require('./routes/api/faculty');
const hod = require('./routes/api/hod');
const department = require('./routes/api/department')
const path = require('path');

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
app.use('/api/publicProfile',publicProfile);
app.use('/api/admin',admin);
app.use('/api/faculty',faculty);
app.use('/api/hod',hod);
app.use('/api/department',department)


//Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  console.log({'IN node_env':process.env.NODE_ENV})
  app.use(express.static('client/build'));
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
