require('dotenv').load();
const jwt = require('jsonwebtoken');

exports.loginRequired = function loginRequiredMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.status(401).json({ message: 'Please log in first' });
      }
    });
  } catch (e) {
    res.status(401).json({ message: 'Please log in first' });
  }
};

exports.ensureCorrectUser = function ensureCorrectUserMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.userId === req.params.id) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorised' });
      }
    });
  } catch (e) {
    res.status(401).json({ message: 'Unauthorised' });
  }
};
