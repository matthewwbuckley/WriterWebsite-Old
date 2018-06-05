const mongoose = require('mongoose');

const User = require('./user');
const Reading = require('./reading');
const Series = require('./series');
const Rating = require('./rating');
const Tag = require('./tag');

const pieceSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wordLimit:{
    type: Number,
    required: true
  },
  datePublished:{
    type:Date,
    default: Date.now,
    required: true
  },
  series:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series'
  },
  readings:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reading'
  }],
  ratings:{
    all:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
      }
    ],
    averages:{
      week:{
        type:Number,
        default: 0
      },
      month:{
        type:Number,
        default: 0
      },
      year:{
        type:Number,
        default: 0
      }
    },
    count:{
      week:{
        type:Number,
        default: 0
      },
      month:{
        type:Number,
        default: 0
      },
      year:{
        type:Number,
        default: 0
      }
    } 
  },
  tags:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      }
    }
  ],
})

module.exports = mongoose.model('Piece', pieceSchema);