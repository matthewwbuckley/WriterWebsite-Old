const DB = require("../../models");

exports.getAllUsers = async function(req, res, next){
  try {
    let allUsers = await DB.User.find({});
    return res.status(200).json(allUsers);
  } catch(err) {
    return next(err);
  }
}

exports.createUser = async function(req, res, next){
  try {
    let user = await DB.User.create(req.body);
    return res.status(201).json(user);
  } catch(err) {
    return next(err);
  }
}

exports.getUser = async function(req, res, next){
  try {
    let user = await DB.User.findById(req.params.userId);
    return res.status(200).json(user);
  } catch(err) {
    return next(err);
  }
}

exports.getAllPiecesByAuthor = async function(req, res, next){
  try {
    let user = await DB.User.findById(req.params.userId);
    if(!user){
      let err = new Error("User not found!");
      err.status = 404;
      throw err;
    }
    let allPieces = await DB.Piece.find({author: user._id});
    return res.status(200).json(allPieces)
  } catch (err){
    return next(err)
  }
}



exports.getAllReadingsByAuthor = async function(req, res, next){
  try {
    let user = await DB.User.findById(req.params.userId);
    if(!user){
      let err = new Error("User not found!");
      err.status = 404;
      throw err;
    }
    let allReadings = await DB.Reading.find({author: user._id});
    return res.status(200).json(allReadings)
  } catch (err){
    return next(err)
  }
}


