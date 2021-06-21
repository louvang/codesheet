const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'No user with that email exists.' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Passwords match. Log in user.
          return done(null, user);
        } else {
          // Passwords do not match. Do not log in user.
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  User.findById(_id, function (err, user) {
    done(err, user);
  });
});
