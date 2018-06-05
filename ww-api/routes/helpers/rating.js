const DB = require("../../models");

exports.createRating = async function(req, res, next){
  try {
    const yearInMilliseconds = 31556952000;
    const monthInMilliseconds = 2592000000;
    const weekInMilliseconds = 604800000;
    const dayInMilliseconds = 86400000;


    let yearCount, monthCount, weekCount, dayCount = 0;
    let yearAvg, monthAvg, weekAvg, dayAvg = 0;
    let ratingObject = {
      userId:req.body.userId,
      pieceId:req.body.pieceId,
      readingId:req.body.readingId,
      rating:req.body.rating,
      comment: req.body.comment
    }

    console.log('Rating OBject:',ratingObject)

    if(ratingObject.pieceId){
      if(ratingObject.readingId){
        let err = new Error('Attempting to rate Piece and Reading');
        err.status = 400;
        throw err;
      }
      ratingObject.pieceId = req.body.pieceId;
    } else {
      if(ratingObject.readingId){
        ratingObject.readingId = req.body.readingId;
      } else {
        let err = new Error('Attempting to rate Nothing');
        err.status = 400;
        throw err;
      }
    }

    // check that the rating is in the correct range
    if (ratingObject.rating<-3 || ratingObject.rating>3){
      let err = new Error('Rating out of range!');
      err.status = 400;
      throw err;
    }

    let rating = await DB.Rating.create(ratingObject);
    
    // update the piece if applicable with new rating
    if(ratingObject.pieceId){
      let piece = await DB.Piece.findById(ratingObject.pieceId);
      let pieceFull = await DB.Piece.findById(ratingObject.pieceId).populate('ratings.all');
      piece.ratings.all.push(rating._id);
      pieceFull.ratings.all.push(rating);
      console.log(pieceFull.ratings.all)
      
      // zero out before counting again
      piece.ratings.count = { week: 0, month: 0, year: 0 }
      piece.ratings.averages = { week: 0, month: 0, year: 0 }
      // loop through to count and update average for each time braket
      piece.ratings.all.forEach((rating, index) => {
        let rate = pieceFull.ratings.all[index];
        let dateCreated = new Date(rate.dateCreated);

        if( dateCreated > Date.now() - yearInMilliseconds){
          piece.ratings.count.year += 1;
          piece.ratings.averages.year = ((piece.ratings.averages.year * (piece.ratings.count.year - 1)) + rate.rating) / piece.ratings.count.year;
          if(dateCreated > Date.now() - monthInMilliseconds){
            piece.ratings.count.month += 1;
            piece.ratings.averages.month = ((piece.ratings.averages.month * (piece.ratings.count.month - 1)) + rate.rating) / piece.ratings.count.month;
            if(dateCreated > Date.now() - weekInMilliseconds){
              piece.ratings.count.week += 1;
              piece.ratings.averages.week = ((piece.ratings.averages.week * (piece.ratings.count.week - 1)) + rate.rating) / piece.ratings.count.week;
              if(dateCreated > Date.now() - dayInMilliseconds){
                piece.ratings.count.day += 1;
                piece.ratings.averages.day = ((piece.ratings.averages.day * (piece.ratings.count.day - 1)) + rate.rating) / piece.ratings.count.day;
              }
            }
          }
        }
      });

      await piece.save();
    }

    // update the reading if applicable with new rating
    if(ratingObject.readingId){
      console.log('Rating OBject:',ratingObject)
      let reading = await DB.Reading.findById(ratingObject.readingId);
      let readingFull = await DB.Reading.findById(ratingObject.readingId).populate('ratings.all');
      reading.ratings.all.push(rating._id);
      readingFull.ratings.all.push(rating._id);

      // loop through to count and update average for each time braket
      reading.ratings.all.forEach((rating, index) => {
        let rate = readingFull.ratings.all[index];
        let dateCreated = new Date(rate.dateCreated);

        if(rate.dateCrated > Date.now() - yearInMilliseconds){
          reading.count.year += 1;
          reading.ratings.average.year = ((reading.ratings.average.year * (reading.ratings.count.year - 1)) + rate.rating) / reading.ratings.count.year;
          if(rate.dateCrated > Date.now() - monthInMilliseconds){
            reading.count.month += 1;
            reading.ratings.average.month = ((reading.ratings.average.month * (reading.ratings.count.month - 1)) + rate.rating) / reading.ratings.count.month;
            if(rate.dateCrated > Date.now() - weekInMilliseconds){
              reading.count.week += 1;
              reading.ratings.average.week = ((reading.ratings.average.week * (reading.ratings.count.week - 1)) + rate.rating) / reading.ratings.count.week;
              if(rate.dateCrated > Date.now() - dayInMilliseconds){
                reading.count.day += 1;
                reading.ratings.average.day = ((reading.ratings.average.day * (reading.ratings.count.day - 1)) + rate.rating) / reading.ratings.count.day;
              }
            }
          }
        }
      });

      await reading.save();
    }

    return res.status(201).json(rating);
  } catch(err) {
    return next(err);
  }
}