const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days in milliseconds
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');

// Routes
require('./routes/auth')(app);
require('./routes/sheets')(app);

// Serving assets from client build for Heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use('*', express.static('client/build'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
