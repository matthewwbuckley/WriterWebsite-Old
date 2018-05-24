var express = require("express");
var router = express.Router();
var fs = require("fs");
var DB = require("../models");
var helper = require("./helpers/rating");

router.route("/")
  .post(helper.createRating);

module.exports = router;