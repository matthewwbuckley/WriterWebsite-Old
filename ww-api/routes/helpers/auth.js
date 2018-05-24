const DB = require("../../models");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userHelper = require("./user")

exports.signIn = async function (req, res, next){
  try {
    // find the user by their username
    var user = await DB.User.findOne({username: req.body.username})
    if (!user) {
      let err = new Error("Incorrect Username or Password");
      err.status = 404;
      throw err;
    } 
  } catch(err) {
    return next(err);
  }

  try {
    // check that their password is correct
    user.comparePassword(req.body.password, function(err,isMatch){
      if(isMatch){
        var token = JWT.sign({userID: user.id}, process.env.SECRET_KEY);
        // return the required userdata
        return res.status(200).json({
            userID: user.id,
            username: user.username,
            token
        });
      } else {
      let err = new Error("Incorrect Username or Password");
      err.status = 401;
      throw err;
      }
    });
  } catch(err) {
    return next(err);
  }
  
}

exports.register = async function(req, res, next){
  try {
    let user = await DB.User.create(req.body);
    var token = JWT.sign({userID: user.id}, process.env.SECRET_KEY);
    // return the required userdata
    return res.status(200).json({
        userID: user.id,
        username: user.username,
        token
    });
  } catch(err) {
    return next(err);
  }
}

// this is a odd/ugly auth function, it refreshes/checks the token.
// Currently it is designed to return old token
// error thowing is for practice. The same error is returned so that "hackers" dont get information
exports.refresh = async function(req, res, next) {
  try {
    // check if there is a token
    var token = req.body.token || req.query.token;
    if (!token) {
      let err = new Error("You have to be logged in to do that");
      err.status = 401;
      throw err;
    }
  } catch(err) {
    return next(err);
  }

  try {
  // Check token is correct decoding token using secret
  JWT.verify(token, process.env.SECRET_KEY, function(err, user) {
    if (err) {
      err.message = "You have to be logged in to do that";
      err.status = 401;
      throw err;
    }
    // find user data corresponding to that user
    DB.User.findById(user.userID, function(err, user) {
      if (err) {
        err.message = "You have to be logged in to do that";
        err.status = 401;
        throw err;
      }
      // You can renew token by creating new token but I’m 
      // just passing the old token back.
      var token = JWT.sign({userID: user.id}, process.env.SECRET_KEY);
      return res.status(200).json({
          username: user.username,
          userID: user._id,
          token
      });
    });
  });
  } catch(err) {
    return next(err);
  }

}

module.exports = exports