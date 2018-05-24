const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');

const DB = require('../models');
const Data = require('./data')

let DUMMY = {};
DUMMY.tag=[];
DUMMY.piece=[];
DUMMY.playlist=[];
DUMMY.rating=[];
DUMMY.reading=[];
DUMMY.series=[];
DUMMY.user=[];

const seedDB = async function(){
  //await dummyData();
  await tags();
  await users();
  await pieces();
  await readings();
  await playlists();
  await series();
}

const call = function(err, message){
  if(err){
    console.log(err)
  }
  console.log(message)
}

const tags = async function(){
  await DB.Tag.remove({}, call(null, "Tags have been removed"));
  // DUMMY.tag.forEach(async function(tag){
  //   let string = "Created the tag "+tag.tag+" for "+tag.tagType;
  //   await DB.Tag.create(tag, call(null, string));
  // })
}

const users = async function(){
  await DB.User.remove({}, call(null, "Users have been removed"));
  // DUMMY.user.forEach(async function(user){
  //   let string = "Created the user "+user.username;
  //   await DB.User.create(user, call(null, string));
  // })
}

const pieces = async function(){
  await DB.Piece.remove({}, call(null, "Pieces have been removed"));
  // DUMMY.piece.forEach(async function(piece){
  //   let string = "Created the Piece "+piece.title;
  //   await DB.Piece.create(piece, call(null, string));
  // })
}

const playlists = async function(){
  await DB.Playlist.remove({}, call(null, "Playlists have been removed"));
  // DUMMY.playlist.forEach(async function(playlist){
  //   let string = "Created the Playlist";
  //   await DB.Playlist.create(playlist, call(null, string));
  // })
}

const ratings = async function(){
  await DB.Rating.remove({}, call(null, "Ratings have been removed"));
  // DUMMY.rating.forEach(async function(rating){
  //   let string = "Created the Rating"
  //   await DB.Rating.create(rating, call(null, string));
  // })
}

const readings = async function(){
  await DB.Reading.remove({}, call(null, "Readings have been removed"));
  // DUMMY.reading.forEach(async function(reading){
  //   let string = "Created the Reading";
  //   await DB.Reading.create(reading, call(null, string));
  // })
}

const series = async function(){
  await DB.Series.remove({}, call(null, "Series have been removed"));
  // DUMMY.series.forEach(async function(series){
  //   let string = "Created the Series";
  //   await DB.Series.create(series, call(null, string));
  // })
}



const dummyData = async function(){
  let ignore = ['_id', 'options']
  let options = {
    ignore,
    returnDate: true
  }
  for (let index = 0; index < 20; index++) {
    await DUMMY.tag.push(dummy(DB.Tag, options))
    await DUMMY.piece.push(dummy(DB.Piece, options))
    await DUMMY.playlist.push(dummy(DB.Playlist, options))
    await DUMMY.rating.push(dummy(DB.Rating, options))
    await DUMMY.reading.push(dummy(DB.Reading, options))
    await DUMMY.series.push(dummy(DB.Series, options))
    await DUMMY.user.push(dummy(DB.User, options))
  }
  console.log(DUMMY)
}

module.exports = seedDB;