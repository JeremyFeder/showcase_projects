const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  _message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
