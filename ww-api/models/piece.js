const mongoose = require('mongoose');

// I do not assign these values as the value is not used
// TODO: remove reading
require('./user');
require('./reading');
require('./series');
require('./rating');

const pieceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wordLimit: {
    type: Number,
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now,
    required: true,
  },
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  },
  readings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reading',
    },
  ],
  ratings: {
    all: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
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

module.exports = mongoose.model('Piece', pieceSchema);
