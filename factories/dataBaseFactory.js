const mongoose = require("mongoose");
const tagsFactory = require("./tagsFactory");
const categoriesFactory = require("./categoriesFactory");
const usersFactory = require("./usersFactory");
const getFilesList = require("../helpers/getFilesList");
const videosFactory = require("./videosFactory");
const path = require('path');

require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

const databaseFactories = async () => {
  // await tagsFactory();
  // await categoriesFactory();
  // await usersFactory(30);
  await videosFactory();

  console.log('DONE!!')
}

databaseFactories();
