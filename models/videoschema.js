const mongoose = require('mongoose');


const Myvideos = mongoose.model('Myvideos', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
});

module.exports = {Myvideos};
