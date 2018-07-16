const mongoose = require('mongoose');

require('./piece');

const seriesSchema = new mongoose.Schema({
  pieces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece',
    },
  ],
});

module.exports = mongoose.model('Series', seriesSchema);
