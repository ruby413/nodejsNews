const mongoose = require('mongoose');
 
let User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  privilege: {
    type: String,
    required: true
  },
}));

module.exports = User
