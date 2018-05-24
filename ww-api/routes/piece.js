var express = require("express");
var router = express.Router();
var fs = require("fs");
var DB = require("../models");
var helper = require("./helpers/piece");

router.route("/")
  .get(helper.getAllPieces)
  .post(helper.createPiece);

router.route("/:pieceId")
  .get(helper.getPiece)

  router.route("/:pieceId/full")
  .get(helper.getPieceFull)

module.exports = router;