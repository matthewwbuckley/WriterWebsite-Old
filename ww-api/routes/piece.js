const express = require('express');

const router = express.Router();
require('fs');
require('../models');
const helper = require('./helpers/piece');

router.route('/')
  .get(helper.getAllPieces)
  .post(helper.createPiece);

router.route('/:pieceId')
  .get(helper.getPiece);

module.exports = router;
