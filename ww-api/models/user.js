const mongoose = require('mongoose');
const validate = require('mongoose-validator').validate;
const bcrypt = require('bcryptjs');

const Piece = require('./piece'); 
const Reading = require('./reading');
const Playlist = require('./playlist');
const Series = require('./series');
const Rating = require('./rating');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 32
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  about:{
    type:String,
    maxlength: 250
  },
  pieces:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Piece' 
  }],
  readings:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reading' 
  }],
  playlists:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  }],
  series:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series'
  }],
  ratings:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ratings'
  }],
  options:[
    {
      option:{
        type: String,
        required:true
      },
      value:{

      }
    }
  ]
})

userSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10)
  .then(function(hashedPassword){
    user.password = hashedPassword;
    next();
  }, function(err){
    return next(err);
  })
})

userSchema.methods.comparePassword = function(attemptedPassword, next) {
  try {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch){
    return next(null, isMatch);
    });
  } catch(err){
    return next(err)
  }
}

module.exports = mongoose.model('User', userSchema);