const Video = require('../models/videoModel');
const videoId = '644ab3e02e75d552458a5ed2';
const userId = '6436b0aab5489f8a650c5d6a';
const session = require('express-session');
const videoViews = async (req, res) => {
    try {
        const video = await Video.findById({ _id: videoId, userId: userId });

        if (!video._id) {
            return res.status(404).json({ message: 'Video not found' });
        }

        if (video) {
            // User has already watched this video, do not increment views field
            return res.json('watched');
        }
        // Increment views field and mark video as watched
        video.views += 1;
        await video.save();

        res.render('videoPage',
            {
                title: 'videoPage',
                titleBox,
                channelBox,
                descriptionBox,
                upNext,
                comments,

            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = videoViews;