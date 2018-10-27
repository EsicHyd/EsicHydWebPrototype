const mongoose = require('mongoose');


const Myevents = mongoose.model('Myevents', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  link: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  eventDate: {
    type: Date,
    required: true,
  },
  addedAt: {
    type: Date,
    required: true,
  },
});

module.exports = {Myevents};
