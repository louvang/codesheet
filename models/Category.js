const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  slug: String,
});

module.exports = mongoose.model('Category', userSchema);
