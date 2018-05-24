var express = require("express");
var router = express.Router({mergeParams: true});
var fs = require("fs");
var DB = require("../models");
var helper = require("./helpers/tag")

router.route("/")
  .get(helper.getAllTagsOfType)
  .post(helper.createTag)

module.exports = router;