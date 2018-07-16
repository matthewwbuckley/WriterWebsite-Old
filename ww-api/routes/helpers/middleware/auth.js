const JWT = require('jsonwebtoken');
const DB = require('../../../models');


// this is a function which checks the token.
exports.tokenCheck = async function tokenCheckAuthMiddleware(req, res, next) {
  try {
    const token = req.body.token || req.query.token;

    // check if there is a token
    if (!token) {
      const err = new Error('A token must be submitted with request');
      err.status = 401;
      throw err;
    }

    // Check token is correct decoding token using secret
    JWT.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        const err = new Error('A token must be submitted with request');
        err.status = 401;
        throw err;
      }

      // TODO: Check if this is needed. Why search again?
      // find user data corresponding to that user
      DB.User.findById(user.userID, (errorFound, userFound) => {
        if (errorFound) {
          const err = new Error('A token must be submitted with request');
          err.status = 401;
          throw err;
        }
        return next(userFound);
      });
    });

    return null;
  } catch (err) {
    return next(err);
  }
};
