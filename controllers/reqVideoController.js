const Video = require("../models/videoModel");
const AdminPreview = require("../models/adminPreview");
const Category = require("../models/category");
const User = require("../models/User");

const saveReqVideo = async (req, res) => {
  try {
    const { videoId, adminDecision, adminComment } = req.body;
    const videoExist = await Video.findById(videoId);
    if (!videoExist) {
      return res.status(400).json({ message: "Bad input" });
    } else {
      if (adminDecision !== "true" && adminDecision !== "false") {
        return res.status(400).json({ message: "Bad input" });
      } else {
        // Check if the video already has an admin preview
        const adminPreviewExist = await AdminPreview.findOne({ videoId: videoId });
        if (adminPreviewExist) {
          return res.status(400).json({ message: "Video already reviewed by admin!" });
        }
        
        // Create the admin preview
        const adminPreview = new AdminPreview({
          videoId: videoId,
          adminDecision: adminDecision,
          adminComment: adminComment,
        });
        await adminPreview.save();

        // Update the admin decision in the Video model
        videoExist.adminPreview = adminPreview._id;
        videoExist.adminDecision = adminDecision;
        await videoExist.save();

        res.redirect("/requestvideos");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving video request." });
  }
};


const videoPreview = async (req, res) => {
  try {

    const userEmail = req.session.user_id;
    const user = await User.findOne({ email: userEmail });

    const { id } = req.params;
    const video = await Video.findOne({ _id: id })
      .populate("category")
      .populate("tags");
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }
    res.render("videoPreview", { title: "video Preview", video  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving video." });
  }
};

const getAllReqVideos = async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate("category")
      .populate({
        path: "adminPreview",
        populate: {
          path: "videoId",
          select: "title",
        },
      });

    const categories = await Category.find({});
    res.render("requestedVideo", {
      currentVideos: videos,
      categories: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving videos." });
  }
};

module.exports = {
  saveReqVideo,
  videoPreview,
  getAllReqVideos,
};
