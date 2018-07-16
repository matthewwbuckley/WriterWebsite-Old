const DB = require('../../models');
const pieceSort = require('./middleware/pieceSorting');

// TODO: Rename. now returns a sorted selection
exports.getAllPieces = async (req, res, next) => {
  try {
    const sort = req.query.sort || null;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;
    // const wordLimit = req.query.number || null;

    const allPieces = await DB.Piece.find({});
    const sortedPieces = pieceSort.sort(allPieces, sort);
    const slicedPieces = sortedPieces.slice((page - 1) * perPage, page * perPage);

    return res.status(200).json(slicedPieces);
  } catch (err) {
    return next(err);
  }
};

exports.getPiece = async (req, res, next) => {
  try {
    const id = req.params.pieceId;
    let piece = null;

    piece = await DB.Piece.findById(id)
      .populate('author', 'username')
      .populate({ path: 'ratings.all', populate: { path: 'userId', select: 'username' } });

    return res.status(200).send(piece);
  } catch (err) {
    return next(err);
  }
};


exports.createPiece = async (req, res, next) => {
  try {
    const piece = await DB.Piece.create(req.body);

    // updating the user to add the new piece
    const user = await DB.User.findById(req.body.author);
    user.pieces.push(piece);
    user.save();

    return res.status(201).json(piece);
  } catch (err) {
    return next(err);
  }
};

module.exports = exports;
