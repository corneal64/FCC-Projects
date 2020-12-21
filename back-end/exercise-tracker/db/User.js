const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  count: Number,
  logs: [
    {
      description: { type: String, required: true },
      duration: { type: Number, required: true },
      date: { type: Date, default: new Date().toDateString() }
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
