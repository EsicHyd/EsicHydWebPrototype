const mongoose = require('mongoose');


const Myvideos = mongoose.model('Myvideos', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
});

module.exports = {Myvideos};
