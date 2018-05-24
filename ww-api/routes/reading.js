var express = require("express");
var router = express.Router();
var fs = require("fs");
var DB = require("../models");
var helper = require("./helpers/reading");


router.route("/")
  .get(helper.getAllReadings)
  .post(helper.createReading);

router.route("/:readingId")
  .get(helper.getReading)
  

module.exports = router;