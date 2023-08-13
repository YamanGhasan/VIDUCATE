const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30
  },
  description: {
    type: String,
    required: true,
    maxLength: 5000
  },
  image: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  videos: {
    type: [String],
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
