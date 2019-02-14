const express = require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');

const db = require('./config/keys').mongoURI;
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());

app.use('/api/users',users);
require('./config/passport')(passport);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
