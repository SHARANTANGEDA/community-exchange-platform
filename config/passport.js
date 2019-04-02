const JWTStrategy = require('passport-jwt/lib').Strategy;
const extractJWT = require('passport-jwt/lib').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use('all',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            return done(null,user);
          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('student',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='student') {
              return done(null,user);
            } else {
              return done(null,false);
            }          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('hod',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='hod') {
              return done(null,user);
            } else {
              return done(null,false);
            }
          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('faculty',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='faculty') {
              return done(null,user);
            } else {
              return done(null,false);
            }
          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('TA',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='TA'){
              return done(null,user);
            } else {
              return done(null,false);
            }
          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );

  passport.use('admin',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='admin') {
              return done(null,user);
            } else {
              return done(null,false);
            }
          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
};