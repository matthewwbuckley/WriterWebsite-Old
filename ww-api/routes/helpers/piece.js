const DB = require("../../models");

exports.getAllPieces = async function(req, res, next){
  try {
    let allPieces = await DB.Piece.find({})
    return res.status(200).json(allPieces)
  } catch (err){
    return next(err)
  }
}

exports.getPiece = async function(req, res, next){
  try {
    let id = req.params.pieceId;
    let piece = await DB.Piece.findById(id).populate('author', 'username').populate({path: 'ratings.all', populate: {path: 'userId', select:'username'}})
    // TODO: populate
    return res.status(200).send(piece)
  } catch(err) {
    return next(err)
  }
}

exports.getPieceFull = async function(req, res, next){
  try {
    let id = req.params.pieceId;
    let piece = await DB.Piece.findById(id).populate('author', 'username').populate('ratings.all', 'comment userId dateCreated rating')
    // TODO: populate
    return res.status(200).send(piece)
  } catch(err) {
    return next(err)
  }
}

exports.createPiece = async function(req, res, next){
  try{
    let piece = await DB.Piece.create(req.body);
    // updating the user to add the new piece
    let user = await DB.User.findById(req.body.author);
    user.pieces.push(piece);
    return res.status(201).json(piece);
  } catch(err) {
    return next(err);
  }
}

module.exports = exports