const mongoose = require('mongoose');
const nconf = require('nconf');

nconf.argv().env().file('keys.json');
mongoose.set('debug', true);

mongoose.Promise = Promise;

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
console.log(uri);
if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);
// local
// uri = 'mongodb://localhost/ww-api';

mongoose.connect(uri, (err, res) => {
  if (err) {
    console.log(`ERROR connecting to ${uri} due to ${err}`);
    throw err;
  } else {npm 
    console.log(`Succeeded connected to: ${uri} with ${res}`);
  }
});

module.exports.User = require('./user');
module.exports.Piece = require('./piece');
module.exports.Rating = require('./rating');
