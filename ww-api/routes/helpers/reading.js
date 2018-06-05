const DB = require("../../models");

exports.getAllReadings = async function(req, res, next){
  try {
    let allReadings = await DB.Reading.find({})
    return res.status(200).json(allReadings)
  } catch (err){
    return next(err)
  }
}



exports.getReading = async function(req, res, next){
  try {
    let id = req.params.readingId;
    let reading = await DB.Reading.findById(id)
    // return the icyoa part of the database entry
    return res.status(200).send(reading)
  } catch(err) {
    return next(err)
  }
}

exports.createReading = async function(req, res, next){
  try{
    let data = {
      userId: req.body.userId
    }

    let reading = await DB.Reading.create(data);
    console.log(reading);

    req.files.file.mv(`./audio/${reading._id}.mp3`, function(err){
      if(err){
        console.log(err)
      } else {
        console.log('moved the file?')
      }
    })

    // updating the user to add the new reading
    let user = await DB.User.findById(req.body.userId);
    user.readings.push(reading);
    user.save();

    // updating the piece to add the new reading
    let piece = await DB.Piece.findById(req.body.pieceId);
    piece.readings.push(reading);
    piece.save();

    return res.status(201).json(reading);
  } catch(err) {
    return next(err);
  }
}

module.exports = exports