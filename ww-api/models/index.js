var mongoose = require('mongoose');
const nconf = require('nconf');

nconf.argv().env().file('keys.json');
mongoose.set('debug', true);

mongoose.Promise = Promise;

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

mongoose.connect(uri, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uri + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uri);
  }
});

module.exports.User = require('./user');
module.exports.Piece = require('./piece');
module.exports.Reading = require('./reading');
module.exports.Playlist = require('./playlist');
module.exports.Rating = require('./rating');
module.exports.Series = require('./series');
module.exports.Tag = require('./tag');