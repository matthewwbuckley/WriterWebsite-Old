const mongoose = require('mongoose');

require('./user');
require('./piece');
require('./rating');

const readingSchema = new mongoose.Schema({
  piece: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Piece',
  },
  title: {
    type: String,
  },
  text: {
    type: String,

  },
  audio: {
    type: String,

  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now,
    required: true,
  },
  ratings: {
    all: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rating',
        },
      },
    ],
    averages: {
      week: {
        type: Number,
        default: 0,
      },
      month: {
        type: Number,
        default: 0,
      },
      year: {
        type: Number,
        default: 0,
      },
    },
    count: {
      week: {
        type: Number,
        default: 0,
      },
      month: {
        type: Number,
        default: 0,
      },
      year: {
        type: Number,
        default: 0,
      },
    },
  },
});

module.exports = mongoose.model('Reading', readingSchema);
