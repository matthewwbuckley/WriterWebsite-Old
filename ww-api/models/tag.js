const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagType:{
    type: String,
    required: true,
    unique: false
  },
  tag:{
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Tag', tagSchema);