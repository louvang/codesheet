const mongoose = require('mongoose');
const { Schema } = mongoose;

const sheetSchema = new Schema({
  title: String,
  slug: String,
  content: String,
  dateCreated: Date,
  lastUpdated: Date,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

module.exports = mongoose.model('Sheet', userSchema);
