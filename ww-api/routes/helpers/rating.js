const DB = require('../../models');

exports.createRating = async (req, res, next) => {
  try {
    const yearInMilliseconds = 31556952000;
    const monthInMilliseconds = 2592000000;
    const weekInMilliseconds = 604800000;
    const dayInMilliseconds = 86400000;

    // comment is not required
    // TODO: remove readings
    const ratingObject = {
      userId: req.body.userId,
      pieceId: req.body.pieceId,
      rating: req.body.rating,
      comment: req.body.comment || null,
    };
    console.log("object", ratingObject)

    // TODO: refactor to remove reading
    if (ratingObject.pieceId) {
      ratingObject.pieceId = req.body.pieceId;
    } else {
      const err = new Error('Attempting to rate Nothing');
      err.status = 400;
      throw err;
    }

    // check that the rating is in the correct range
    if (ratingObject.rating < -3 || ratingObject.rating > 3) {
      const err = new Error('Rating out of range!');
      err.status = 400;
      throw err;
    }
    
    const rating = await DB.Rating.create(ratingObject);
    // update the piece if applicable with new rating
    if (ratingObject.pieceId) {
      // piece will be saved
      // piece full contains all the reviews to update week/month/year info
      const piece = await DB.Piece.findById(ratingObject.pieceId);
      const pieceFull = await DB.Piece.findById(ratingObject.pieceId).populate('ratings.all');

      piece.ratings.all.push(rating._id);
      pieceFull.ratings.all.push(rating);

      // zero out before counting again
      const count = { week: 0, month: 0, year: 0 };
      const averages = { week: 0, month: 0, year: 0 };

      // loop through to count and update average for each time bracket
      pieceFull.ratings.all.forEach((pastRating) => {
        // const rate = pieceFull.ratings.all[index];
        const dateCreated = new Date(pastRating.dateCreated);

        // TODO: for averages - summing and then averaging at the end would be slightly quicker
        if (dateCreated > Date.now() - yearInMilliseconds) {
          count.year += 1;
          averages.year = (
            (averages.year * (count.year - 1)) + pastRating.rating
          ) / count.year;
          if (dateCreated > Date.now() - monthInMilliseconds) {
            count.month += 1;
            averages.month = (
              (averages.month * (count.month - 1)) + pastRating.rating
            ) / count.month;
            if (dateCreated > Date.now() - weekInMilliseconds) {
              count.week += 1;
              averages.week = (
                (averages.week * (count.week - 1)) + pastRating.rating
              ) / count.week;
              if (dateCreated > Date.now() - dayInMilliseconds) {
                count.day += 1;
                averages.day = (
                  (averages.day * (count.day - 1)) + pastRating.rating
                ) / count.day;
              }
            }
          }
        }
      });
      piece.ratings.count = count;
      piece.ratings.averages = averages;
      await piece.save();
    }

    return res.status(201).json(rating);
  } catch (err) {
    return next(err);
  }
};

module.exports = exports;
