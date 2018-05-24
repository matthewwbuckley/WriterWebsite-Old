const mongoose = require('mongoose');


const Piece = require('./piece'); 

const seriesSchema = new mongoose.Schema({
  pieces:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece'
    }
  ]
})

module.exports = mongoose.model('Series', seriesSchema);