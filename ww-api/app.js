require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// when authMiddleware is used set to value
require('./middleware/auth');
const errorHandler = require('./routes/helpers/error');

const allowCrossDomain = function allowCrossDomainBackendSettings(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};


//  APP CONFIG
const app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set('view engine', 'ejs');


// DATABASE CONFIG
// cut from models/index.js

// ROUTE FILES
// var indexRoutes = require('./routes/index');
const pieceRoutes = require('./routes/piece');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const ratingRoutes = require('./routes/rating');

// ROUTE SET-UP
// app.use('/api', indexRoutes);


app.use('/api/piece', pieceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rating', ratingRoutes);

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);


// UTILITY


// LISTEN ROUTE
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`The API is listening on port: ${port}`);
});
