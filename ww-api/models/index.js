var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + process.env.MONGODB_URI + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + process.env.MONGODB_URI);
  }
});

module.exports.User = require('./user');
module.exports.Piece = require('./piece');
module.exports.Reading = require('./reading');
module.exports.Playlist = require('./playlist');
module.exports.Rating = require('./rating');
module.exports.Series = require('./series');
module.exports.Tag = require('./tag');