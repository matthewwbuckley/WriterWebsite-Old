const mongoose = require('mongoose');

require('./user');
require('./piece');
require('./reading');

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pieceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Piece',
  },
  readingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reading',
  },
});

module.exports = mongoose.model('Rating', ratingSchema);
