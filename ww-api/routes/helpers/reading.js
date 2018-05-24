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
    let reading = await DB.Reading.create(req.body);
    // updating the user to add the new reading
    let user = await DB.User.findById(req.body.author);
    user.readings.push(reading);
    return res.status(201).json(user);
  } catch(err) {
    return next(err);
  }
}

module.exports = exports