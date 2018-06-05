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
    let piece = await DB.Piece.findById(id)
      .populate('author', 'username')
      .populate({path: 'ratings.all', populate: {path: 'userId', select:'username'}})
      .populate('readings')
      .populate({path: 'readings', populate: {path: 'userId', select:'username'}})
      .populate('readings.ratings.all')
      //.populate({path: 'readings.ratings.all', populate: {path: 'userId', select:'username'}})
    
    
    for(let readingIndex = 0; readingIndex < piece.readings.length; readingIndex++ ){
      let reading = piece.readings[readingIndex]
      for(let ratingIndex = 0; ratingIndex < reading.ratings.all.length; ratingIndex++ ){
        let rating =  piece.readings[readingIndex].ratings.all[ratingIndex]
        console.log(rating);
        let fullRating = await DB.Rating.findById(rating._id)
        piece.readings[readingIndex].ratings.all[ratingIndex] = fullRating;
      }
    }

    // await piece.readings.forEach(async (reading, readingIndex, readingArray) => {
    //   await reading.ratings.all.forEach(async (rating, ratingIndex, ratingArray) => {
    //     let fullRating = await DB.Rating.findById(rating._id)
    //     console.log(readingIndex, ratingIndex, fullRating);
    //     readingArray[readingIndex].ratings.all[ratingIndex] = fullRating
    //     console.log(readingArray[readingIndex].ratings.all[ratingIndex])
    //     console.log(piece.readings[readingIndex].ratings.all[ratingIndex])
    //   });
    // }); 
    
    //console.log(piece.readings[0].ratings.all);

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
    user.save()
    return res.status(201).json(piece);
  } catch(err) {
    return next(err);
  }
}

module.exports = exports