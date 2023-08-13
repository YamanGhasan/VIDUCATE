const Video = require("../models/videoModel");
const Category = require("../models/category");


exports.homeController = async (req, res) => {
  try {

    const channelsCategories = await Category.find();
    const featuredVideos = await Video.find().populate("category").limit(12);

    res.render("home", {
      title: "Viducate",
      APP_URL: process.env.APP_URL,
      channelsCategories,
      featuredVideos,

    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};


