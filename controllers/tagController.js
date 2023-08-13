const { Validator } = require("node-input-validator");
const Tag = require("../models/tag");
const User = require("../models/User");
const createTag = async (req, res) => {
  const validation = new Validator(req.body, {
    name: "required|string|maxLength:60",
    description: "required|string|maxLength:300",
  });
  validation.check().then((matched) => {
    if (!matched) {
      res.status(422).send(validation.errors);
    }
  });
  let newTag = new Tag({
    name: req.body.name,
    description: req.body.description,
  });
  newTag.save();
  res.redirect("/tags/table");
};

// Edit tag
const editTag = async (req, res) => {
  var element = {
    name: req.body.name,
    description: req.body.description,
  };
  Tag.findByIdAndUpdate(req.params.id, { $set: element }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/tags/table");
    }
  });
};

//tag table
const tagTable = async (req, res) => {  

  Tag.find({}, function (err, tagTable) {
    res.render("tagTable", {
      tagList: tagTable
    });
  });
};
//delete tag
const deleteTag = async (req, res) => {
  Tag.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/tags/table");
    } else {
      console.log(err);
    }
  });
};

Tag.getAll = async function () {
  return await this.find({}, 'name').lean();
};

module.exports = {
  createTag,
  editTag,
  tagTable,
  deleteTag,
};
