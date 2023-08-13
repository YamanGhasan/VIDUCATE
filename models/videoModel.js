const mongoose = require('mongoose');
const { ageCalculator } = require('../helpers/dateAndTime');
const { videosPreProcessor } = require('../helpers/videosHelpers');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 5000,
  },
  videoPath: {
    type: String,
  },
  videoImagePath: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  isFree: {
    type: Boolean,
    required: true,
  },
  videoLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  clapCount: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["processing", "processed", "error"],
    default: "processing",
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  adminPreview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminPreview",
  },
});

videoSchema.post(['find', 'findOne', 'findById'], ageCalculator); 
videoSchema.post(['find', 'findOne', 'findById'], videosPreProcessor); 

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
