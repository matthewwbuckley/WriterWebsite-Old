const mongoose = require('mongoose');
// const {validate} = require('mongoose-validator').validate;
const bcrypt = require('bcryptjs');

require('./piece');
require('./reading');
require('./playlist');
require('./series');
require('./rating');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    maxlength: 250,
  },
  pieces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece',
    },
  ],
  readings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reading',
    },
  ],
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
    },
  ],
  series: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Series',
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ratings',
    },
  ],
  options: [
    {
      option: {
        type: String,
        required: true,
      },
      value: {

      },
    },
  ],
});

userSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    return next();
  }, err => next(err));

  // null is returned because next is called with compare
  return null;
});

userSchema.methods.comparePassword = function comparePasswordUserModel(attemptedPassword, next) {
  try {
    bcrypt.compare(attemptedPassword, this.password, (err, isMatch) => next(null, isMatch));

    // null is returned because next is called with compare
    return null;
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
