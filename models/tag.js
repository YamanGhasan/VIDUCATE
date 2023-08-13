const mongoose=require('mongoose') 

// craeting data schema 
const tagSchema = {
    name: {
      type: String,
      unique: true,// `title` must be unique
      required: true 
    },
    description: {
      type: String,
      required: true 
    }}
  
const Tag = mongoose.model("Tag",tagSchema)
  

module.exports = Tag;