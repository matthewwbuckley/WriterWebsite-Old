const DB = require('../../models');

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await DB.User.find({});
    return res.status(200).json(allUsers);
  } catch (err) {
    return next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await DB.User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await DB.User.findById(req.params.userId);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

exports.getAllPiecesByAuthor = async (req, res, next) => {
  try {
    const user = await DB.User.findById(req.params.userId);

    if (!user) {
      const err = new Error('User not found!');
      err.status = 404;
      throw err;
    }

    const allPieces = await DB.Piece.find({ author: user._id });

    return res.status(200).json(allPieces);
  } catch (err) {
    return next(err);
  }
};


// TODO: remove
exports.getAllReadingsByAuthor = async (req, res, next) => {
  try {
    const user = await DB.User.findById(req.params.userId);

    if (!user) {
      const err = new Error('User not found!');
      err.status = 404;
      throw err;
    }

    const allReadings = await DB.Reading.find({ author: user._id });
    return res.status(200).json(allReadings);
  } catch (err) {
    return next(err);
  }
};

module.exports = exports;
