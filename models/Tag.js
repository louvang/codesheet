const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  title: String,
  slug: String,
});

module.exports = mongoose.model('Tag', userSchema);
