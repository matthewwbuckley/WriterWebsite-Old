const express = require('express');

const router = express.Router();
require('../models');
const helper = require('./helpers/user');

router.route('/')
  .post(helper.createUser);


// routes for a single user
router.route('/:userId')
  .get(helper.getUser);


// route for all pieces by author
router.route('/:userId/piece/')
  .get(helper.getAllPiecesByAuthor);


module.exports = router;
