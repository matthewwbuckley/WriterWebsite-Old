const mongoose = require('mongoose');

const User = require('./user');
const Piece = require('./piece'); 
const Rating = require('./rating');
const Tag = require('./tag');

const readingSchema = new mongoose.Schema({
  piece:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Piece'
  },
  title:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  audio:{
    type: String,
    required: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  datePublished:{
    type:Date,
    default: Date.now,
    required: true
  },
  ratings:{
    all:[
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rating'
        }
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
  ]
})

module.exports = mongoose.model('reading', readingSchema);