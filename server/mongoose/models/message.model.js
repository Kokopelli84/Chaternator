const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  authorid: String,
  content: String,
  timestamp: String,
  userId: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

MessageSchema.set('toJSON', {
  virtuals: true,
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
