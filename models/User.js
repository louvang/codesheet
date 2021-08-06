const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dateCreated: Date,
  lastActive: Date,
});

userSchema.virtual('username').get(function () {
  return this.email;
});

module.exports = mongoose.model('User', userSchema);
