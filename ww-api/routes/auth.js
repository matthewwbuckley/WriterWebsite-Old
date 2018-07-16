const express = require('express');

const router = express.Router({ mergeParams: true });
require('body-parser');

require('../models');
const helper = require('./helpers/auth');

// AUTH ROUTES
// The auth routes handle authentication and authorization

// sign in route
router.route('/signin')
  .post(helper.signIn);

// register route
router.route('/register')
  .post(helper.register);

// get current user from token
router.route('/refresh')
  .post(helper.refresh);

// logout does not need any information to
// be passed from or to the server at this point

module.exports = router;
