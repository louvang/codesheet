const bcrypt = require('bcryptjs');
const User = require('../models/User');

const passport = require('passport');

// Add new user to database if they do not yet exist
exports.register_post = (req, res) => {
  User.findOne({ email: req.body.email }, async (err, userDoc) => {
    if (err) throw err;
    if (userDoc) {
      res.send('User already exists.');
    }
    if (!userDoc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        dateCreated: Date.now(),
      });

      await newUser.save();
      res.send('User created.');
    }
  });
};

// Login user
exports.login_post = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
};

// Get user info (check if user is logged in)
exports.current_user_get = (req, res) => {
  if (req.user) {
    res.send({ name: req.user.name });
  } else {
    res.send(null);
  }
};

// Log out user
exports.logout_get = (req, res) => {
  req.logout();
  res.redirect('/');
};
