const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  slug: String,
  icon: String,
  sheets: [{ type: Schema.Types.ObjectId, ref: 'Sheet' }],
  dateCreated: Date,
  dateUpdated: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Category', categorySchema);
