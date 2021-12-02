const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.set('toObject', {
  virtuals: true,
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
