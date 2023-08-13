const path = require("path");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

//-- Express Settings & Configurations
app.set("view engine", "ejs"); // use EJS
app.set("views", "./views");
app.use(express.json());
require("dotenv").config();

//-- Express Router Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public"))); // set path for assets folder

const routesAutoLoader = require("./helpers/routesAutoLoader")(app);
const liveChatController = require("./controllers/liveChatController")(app);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));