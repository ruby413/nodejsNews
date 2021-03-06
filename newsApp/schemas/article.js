const mongoose = require('mongoose');

let Article = mongoose.model('Article', new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  reportDate: {
    type: Date,
    default: Date.now
  },
  contents: {
    type: String,
    required : true
  },
  comments: {
    type: Object
  }
}));

module.exports = Article
