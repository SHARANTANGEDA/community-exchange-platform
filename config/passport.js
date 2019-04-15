const JWTStrategy = require('passport-jwt/lib').Strategy;
const extractJWT = require('passport-jwt/lib').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const opts = {};
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  // passport.use('google',
  //   new GoogleStrategy({
  //   clientID: keys.GOOGLE_CLIENT_ID,
  //   clientSecret: keys.GOOGLE_CLIENT_SECRET,
  //   callbackURL: keys.GOOGLE_CALLBACK_URL //TODO CHANGE CALLBACK URL
  // },(accessToken, refreshToken, profile, done) => {
  //     console.log('In google passport strategy')
  //     let user = {
  //     emailId: profile.emails[0].value,
  //     name: profile.displayName,
  //     token: accessToken
  //   };
  //   done(null, user)
  //   }))
  passport.use('admin',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='admin') {
              return done(null,user);
            } else {
              return done(null,false);
            }          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
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