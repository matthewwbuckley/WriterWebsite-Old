var express = require("express");
var router = express.Router();
var DB = require("../models");
var helper = require("./helpers/user");



router.route("/")
  .post(helper.createUser);


// routes for a single user
router.route("/:userId")
  .get(helper.getUser);


// route for all pieces by author
router.route('/:userId/piece/')
  .get(helper.getAllPiecesByAuthor);

// route for all readings by author
router.route('/:userId/reading/')
  .get(helper.getAllReadingsByAuthor);


module.exports = router;