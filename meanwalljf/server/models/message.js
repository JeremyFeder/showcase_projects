const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  _comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Message',messageSchema);
