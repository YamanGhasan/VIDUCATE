const Video = require("../models/videoModel");
const Comment = require("../models/Comment");
const Category = require("../models/category");
const Tag = require("../models/tag");
const User = require("../models/User");
const Note = require("../models/Note");
const fs = require("fs");
const ClapAction = require("../models/clapActionSchema");
const path = require("path");
const { channelBox } = require("../utils/videoPageData");
const { Validator } = require("node-input-validator"); //const Comment = require("../models/Comment");
const Playlist = require("../models/playlist");
const mongoose = require("mongoose");
const RealTimeQuestion = require('../models/realTimeQuestion');

const CHUNK_SIZE = 10 ** 6; // Define the size of each chunk in bytes

async function viewPlaylistCategory(req, res) {
  try {
    const user_id = req.session.user_id;
    const categories = await Category.getAll();
    const tags = await Tag.getAll();
    // const videos = await Video.find({ user_id: STATIC_USER_ID });// for testing
    const videos = await Video.find({ user_id: req.session.user_id });

    const data = { categories, tags, videos, title: "Play List" };
    res.render("playlist", data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
}

async function createPlaylist(req, res) {
  try {
    const validation = new Validator(req.body, {
      playlist_name: "required|string|maxLength:30",
      playlist_description: "required|string|maxLength:5000",
      playlist_image: "required",
      categories: "required|array",
      "categories.*": "required|string",
      tags: "required|array",
      "tags.*": "required|string",
      videos: "required|array",
      "videos.*": "required|string",
    });

    if (await validation.check()) {
      const user = await User.findOne({ email: req.session.user_id });
      if (!user) {
        throw new Error("User not found");
      }
      const playlist = new Playlist({
        name: req.body.playlist_name,
        description: req.body.playlist_description,
        image: req.body.playlist_image,
        categories: req.body.categories,
        tags: req.body.tags,
        videos: req.body.videos,
        // user_id: STATIC_USER_ID,
        user_id: user._id,
      });
      const result = await playlist.save();
      res.redirect(`/playlist/${result._id}`);
    } else {
      const errors = validation.errors;
      res.status(400).send({ message: "Validation failed", errors });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
}

const viewCreateVideoPage = async (req, res) => {
  try {
    const categories = await Category.find({});
    const tags = await Tag.find({});
    res.render("uploadVideo", {
      title: "Uploadvideo",
      categories,
      tags,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error , can not fetch the data from DB");
  }
};

const getCategoriesTags = async (req, res) => {
  try {
    const categories = await Category.find({});
    const tags = await Tag.find({});
    res.render("uploadVideo", {
      title: "Uploadvideo",
      categories,
      tags,
   
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const createVideo = async (req, res) => {
  const videoValidation = new Validator(req.body, {
    title: "required|maxLength:100",
    description: "required|maxLength:5000",
    video: "required",
    videoImage: "required",
    videoLevel: "required|in:beginner,intermediate,advanced",
    isFree: "required|boolean",
    tags: "required",
    category: "required",
    termsAndConditions: "required",
  });
  //category validation
  const categoryId = req.body.category;

  Category.findById(categoryId, (err, category) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!category) {
      // category with the given ID doesn't exist in the database
      return res
        .status(400)
        .send("Invalid category selected( does not exist in the database).");
    }
  });

  //tag validation
  const tagId = req.body.tags;

  Tag.findById(tagId, (err, tag) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!tag) {
      // Tag with the given ID doesn't exist in the database
      return res
        .status(400)
        .send("Invalid tag selected( does not exist in the database).");
    }
  });

  videoValidation.check().then((matched) => {
    if (!matched) {
      res.status(422).send(videoValidation.errors);
    }
  });
  //  Save the upload video to MongoDB
  try {
    const userId = req.session.user_id;
    const user = await User.findOne({ email: userId });
    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      videoPath: req.body.video,
      videoImagePath: req.body.videoImage,
      category: req.body.category,
      tags: req.body.tags,
      isFree: req.body.isFree,
      videoLevel: req.body.videoLevel,
      userId: user._id
    });

    // Save the video object to the database
    newVideo.save((err) => {
      if (err) {
        return res.status(400).send({ error: err.message });
      } else {

        const videoId = newVideo._id;
        res.redirect(`/videoPreview/${videoId}`);

      }
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const uploadPage = async (req, res) => {
  try {
    res.render("uploadPage", {
      title: "Upload video",
   
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error , can not fetch the data from DB");
  }
};

const videoPage = async (req, res) => {
  const videoId = req.params.id;
  let userId;
  let userLoggedIn = true;
  if (!req.session.user_id) {
    userLoggedIn = false;
  } else {
    const userEmail = req.session.user_id;
    const user = await User.findOne({ email: userEmail });
    userId = user._id;
  }
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    res.render("errorPage", { title: "no such video" });
  } else {
    const notes = await Note.find({ userId , videoId});
    const video = await Video.findById(videoId)
      .populate("userId")
      .populate("tags", "name")
      .populate("category", "name");

    const relatedVideos = await Video.find({
      category: video.category,
    }).populate("category", "name");

    if (video) {
      const userEmail = req.session.user_id;

      const user = await ClapAction.findOne({
        userID: userEmail,
        videoID: videoId,
      });
      let clap = false;
      if (user != null) {
        clap = true;
      } else {
        clap = false;
      }
      const comments = await Comment.find({videoId}).sort({ createdAt: -1 })
        .populate("userId", "userName");

      const questionsContainer = await RealTimeQuestion.findOne({videoId: video._id});

      res.render("videoPage", {
        video,
        creator: video.userId,
        channelBox,
        relatedVideos,
        comments,
        clapped: clap,
        questionsContainer,
        userLoggedIn, 
        notes
      });
    } else {
      res.render("errorPage", { title: "no such video" });
    }
  }
};

const streamVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    const videoPath = path.join(
      __dirname,
      "..",
      "utils/videos",
      video.videoPath
    );
    const stat = fs.statSync(videoPath); // Get the file stats for the video file
    const fileSize = stat.size; // Get the size of the video file in bytes
    const range = req.headers.range; // Get the requested range of bytes from the client
    var start; // Declare a variable to hold the starting byte position
    if (range != undefined) {
      start = Number(range.replace(/\D/g, "")); // Extract the starting byte position from the range header and convert it to a number
    } else {
      start = Number(0); // Set the starting byte position to 0
    }
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1); // Calculate the ending byte position based on the starting position and chunk size, ensuring it does not exceed the end of the file
    const chunkSize = end - start + 1; // Calculate the size of the chunk in bytes
    const file = fs.createReadStream(videoPath, { start, end }); // Create a read stream for the specified chunk of the video file
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`, // Specify the range of bytes being sent in the response
      "Accept-Ranges": "bytes", // Indicate that the server accepts range requests
      "Content-Length": chunkSize, // Specify the size of the chunk being sent in the response
      "Content-Type": "video/mp4", // Specify the MIME type of the response
    };
    res.writeHead(206, headers); // Send the response headers with a 206 Partial Content status code
    file.pipe(res); // Pipe the video chunk to the response stream
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error"); // Send a 500 Internal Server Error response
  }
};


const getInstructorVideos = async (req, res) => {
  try {
      const categories = await Category.getAll();
      const tags = await Tag.getAll();
      const userVideos = await Video.find({ user_id: req.session.user_id });

      const data = { categories, tags, userVideos, title: "Play List" };
      res.render("UserVideos", data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  };






module.exports = {
  viewCreateVideoPage,
  videoPage,
  streamVideo,
  uploadPage,
  getCategoriesTags,
  createVideo,
  viewPlaylistCategory,
  createPlaylist,
  getInstructorVideos
};
