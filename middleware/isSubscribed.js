// Middleware to check if the user is a subscriber
const Video = require("../models/videoModel")
const User = require("../models/User")

function checkSubscriber(req, res, next) {
  if (req.user && req.user.isSubscriber) {
    // User is a subscriber, allow access to video
    next();
  } else {
    // User is not a subscriber, redirect to subscription page or display error message
    res.redirect('/subscribe');
  }
}

async function checkVideoAccess(req, res, next) {
  // Get the video ID from the request parameters
  const videoId = req.params.id;
  const userEmail = req.session.user_id;

  // Find the user in the database using the email address
  const user = await User.findOne({ email: userEmail });

  // Find the video in the database using the ID
  Video.findById(videoId, (err, video) => {
    if (err) {
      // Handle error
      return res.status(500).send('Internal Server Error');
    }

    if (!video) {
      // Handle error: video not found
      return res.status(404).send('Video not found');
    }

    // Check if the video is free or the user is a subscriber
    const isFree = video.isFree;

    if (user && user.isSubscriber || isFree) {
      // User is authorized to access the video
      next();
    } else {
      // User is not authorized to access the video
      res.redirect('/subscribe');
    }
  });
}

module.exports = {
  checkSubscriber,
  checkVideoAccess
};