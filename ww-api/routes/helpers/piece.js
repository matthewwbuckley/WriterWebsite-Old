const DB = require('../../models');
const pieceSort = require('./middleware/pieceSorting');

// TODO: Rename. now returns a sorted selection
// TODO: refactor to different methods for each query type.
exports.getAllPieces = async (req, res, next) => {
  try {
    const sort = req.query.sort || null;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    const author = req.query.author || null;
    let isLast = false;
    // const wordLimit = req.query.number || null;

    if (author) {
      const authorPieces = await DB.Piece.find({ author });
      const selectedPieces = authorPieces.map(piece => (
        {
          title: piece.title,
          _id: piece._id,
          datePublished: piece.datePublished,
        }));
      console.log('PIECES BY AUTHOR', selectedPieces);
      return res.status(200).json({ selectedPieces });
    }

    const allPieces = await DB.Piece.find({});
    if (allPieces.length > 0) {
      const sortedPieces = pieceSort.sort(allPieces, sort);
      const slicedPieces = sortedPieces.slice((page - 1) * perPage, page * perPage);

      const selectedPieces = slicedPieces.map(piece => (
        {
          title: piece.title,
          _id: piece._id,
        }));

      // check if results to be returned are the last
      if (sortedPieces.length < page * perPage + 1) {
        isLast = true;
      }

      return res.status(200).json({ selectedPieces, isLast });
    }

    return res.status(200).json({ selectedPieces: null, isLast });
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
