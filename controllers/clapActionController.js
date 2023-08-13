const Video = require('../models/videoModel');
const ClapAction = require('../models/clapActionSchema');
const Comment = require("../models/Comment");
const { channelBox } = require('../utils/videoPageData');
const Note = require("../models/Note");
const User = require("../models/User");

const clapAction = async (req, res) => {
    const userEmail = req.session.user_id;
    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    const videoId = req.params.id;

    //video page req
    const notes = await Note.find({ userId, videoId });
    const video = await Video.findById(videoId)
        .populate("userId")
        .populate("tags", "name")
        .populate("category", "name");

    const relatedVideos = await Video.find({
        category: video.category,
    }).populate("category", "name");
    const comments = await Comment.find({ videoId }).sort({ createdAt: -1 })
        .populate("userId", "userName");

    ///
    // Check if the clap action already exists
    const clapAction = await ClapAction.findOne({
        userID: userEmail,
        videoID: videoId,
    });

    // Get the video
    const clappedVideo = await Video.findById(videoId);
    if (!clapAction) {
        // Create the clap action
        const newClapAction = new ClapAction({
            userID: userEmail,
            videoID: videoId,
        });

        // Increase the clap count for the video
        clappedVideo.clapCount += 1;

        // Update the ClapWord and Icon values
        try {
            await newClapAction.save();
            await clappedVideo.save();
            return res.render("videoPage",
                {
                    videoSource: `${process.env.APP_URL}/video/get/${videoId}`,
                    video,
                    poster: `${process.env.APP_URL}/images/videosImages/${video.videoImagePath}`,
                    creator: video.userId,
                    channelBox,
                    relatedVideos,
                    comments,
                    userLoggedIn:true,
                    notes,
                    videoId,
                    clapped: true,
                });
        } catch (err) {
            console.log("in first error")
            res.status(500).send(err);
        }
    }
    else {
        if (clapAction) {
            // Update the ClapWord and Icon values
            await clapAction.deleteOne();

            // Decrease the clap count for the video
            clappedVideo.clapCount -= 1

            try {
                await clappedVideo.save();
                return res.render("videoPage",
                    {
                        videoSource: `${process.env.APP_URL}/video/get/${videoId}`,
                        video,
                        poster: `${process.env.APP_URL}/images/videosImages/${video.videoImagePath}`,
                        creator: video.userId,
                        channelBox,
                        relatedVideos,
                        comments,
                        userLoggedIn:true,
                        notes,
                        videoId,
                        clapped: false,
                    });
            } catch (err) {
            console.log("in second error")

                res.status(500).send(err);
            }
        }
    }
}
module.exports = clapAction;
