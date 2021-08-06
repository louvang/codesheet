const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  tagTitle: String,
  dateTagCreated: Date,
  dateTagUpdated: Date,
  sheets: [{ type: Schema.Types.ObjectId, ref: 'Sheet' }],
  tagCreatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Tag', tagSchema);
