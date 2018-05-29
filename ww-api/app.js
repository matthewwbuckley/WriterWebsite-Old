require("dotenv").config();
var express = require("express");
var bodyParser=require("body-parser");
var fileUpload=require('express-fileupload');

var authMiddleware = require("./middleware/auth");
var errorHandler = require("./routes/helpers/error");

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
};


//  APP CONFIG
var app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.set("view engine", "ejs");


// DATABASE CONFIG
// cut from models/index.js

// ROUTE FILES
//var indexRoutes = require("./routes/index");
var pieceRoutes = require("./routes/piece");
var readingRoutes = require("./routes/reading");
var userRoutes = require("./routes/user");
var authRoutes = require("./routes/auth");
var tagRoutes = require("./routes/tag");
var ratingRoutes = require("./routes/rating");

// ROUTE SET-UP
//app.use("/api", indexRoutes);


app.use("/api/piece", pieceRoutes);
app.use("/api/reading", readingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/rating", ratingRoutes);

app.use(function(req,res,next){
  let err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);


// UTILITY
var seed = require("./utility/seed");
//seed()

// LISTEN ROUTE
let port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("The iCYOA api is listening on port: "+port);
});

// this is a comment to check git

