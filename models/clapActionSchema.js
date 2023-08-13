const mongoose = require('mongoose');

const clapActionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  videoID: {
    type: String,
    ref: 'Video',
    required: true,
  },
});

module.exports = mongoose.model('ClapAction', clapActionSchema);