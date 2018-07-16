const mongoose = require('mongoose');
require('./piece');

const playlistSchema = new mongoose.Schema({
  pieces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece',
    },
  ],
});

module.exports = mongoose.model('Playlist', playlistSchema);
