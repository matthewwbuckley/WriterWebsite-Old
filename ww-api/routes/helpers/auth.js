const JWT = require('jsonwebtoken');
require('bcryptjs');
const DB = require('../../models');
require('./user');

exports.signIn = async (req, res, next) => {
  try {
    // check that the username returns a value
    const user = await DB.User.findOne({ username: req.body.username });

    if (!user) {
      const err = new Error('Incorrect Username or Password');
      err.status = 404;
      throw err;
    }

    // check that their password is correct
    // same error returned (if isMatched === true does that mean err is null?)
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        const errMsg = new Error('Incorrect Username or Password');
        errMsg.status = 401;
        throw errMsg;
      } if (err) {
        const errMsg = new Error('Incorrect Username or Password');
        errMsg.status = 401;
        throw errMsg;
      }
      const token = JWT.sign({ userID: user.id }, process.env.SECRET_KEY);
      return res.status(200).json({
        userID: user.id,
        username: user.username,
        token,
      });
    });
  } catch (err) {
    return res.status(404).json({
      userID: null,
      username: null,
      token: null,
      error: 'Incorrect Username or Password',
    });
  }
};

// TODO: checks need to be added for existing user
// TODO: change to other secret code
exports.register = async (req, res, next) => {
  try {
    const user = await DB.User.create(req.body);
    const token = JWT.sign({ userID: user.id }, process.env.SECRET_KEY);

    // return the required userdata
    return res.status(200).json({
      userID: user.id,
      username: user.username,
      token,
    });
  } catch (err) {
    return next(err);
  }
};


// this is a odd/ugly auth function, it refreshes/checks the token.
// Currently it is designed to return old token
// The same error is returned so that "hackers" dont get information
exports.refresh = async (req, res, next) => {
  try {
    // check if there is a token
    const token = req.body.token || req.query.token || null;
    let newToken = null;
    let user = { username: null, _id: null };

    if (!token) {
      return res.status(200).json({
        username: null,
        userID: null,
        token: null,
      });
    }

    // Check token is correct decoding token using secret
    await JWT.verify(token, process.env.SECRET_KEY, async (errVer, userVer) => {
      if (errVer) {
        const errMsg = new Error('You have to be logged in to do that');
        errMsg.status = 401;
        throw errMsg;
      }
      console.log(userVer);
      // find user data corresponding to that user
      await DB.User.findById(userVer.userID, (errFind, userFind) => {
        if (errFind) {
          const errMsg = new Error('You have to be logged in to do that');
          errMsg.status = 401;
          throw errMsg;
        }

        if (userFind !== null) {
          // You can renew token by creating new token but I’m
          // just passing the old token back.
          newToken = JWT.sign({ userID: userFind._id }, process.env.SECRET_KEY);
          user = userFind;
        } else {
          newToken = null;
        }
      });
    });

    return res.status(200).json({
      username: user.username,
      userID: user._id,
      token: newToken,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = exports;
