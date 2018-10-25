const mongoose = require('mongoose');


const Myimages = mongoose.model('Myimages', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
});

module.exports = {Myimages};
