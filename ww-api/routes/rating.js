const express = require('express');

const router = express.Router();
require('fs');
require('../models');
const helper = require('./helpers/rating');

router.route('/')
  .post(helper.createRating);

module.exports = router;
