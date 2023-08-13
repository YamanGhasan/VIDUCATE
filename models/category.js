const mongoose = require('mongoose');

const categorySchema = {
  name: {
    type: String,
    unique: true, // `name` must be unique
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryImage:{
    type: String,
    required: true,
  }
};

const Category = mongoose.model('Category', categorySchema);


module.exports = Category;
