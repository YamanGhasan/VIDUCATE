const Video = require('../models/videoModel');
const Tag = require('../models/tag');
const Category = require('../models/category');
const getImagesList = require('../helpers/getFilesList');
const { VideosTags, VideosNames } = require('../utils/factoriesData');
const path = require('path');

/**
 * insert pre-defined list of videos documents into videos collection.
 */
const videosFactory = async () => {

  const videosImages = getImagesList(path.join(__dirname, "..", "public", "images", "users"));
  const tags = await Tag.find();
  const categories = await Category.find();
  const levelsList = ['beginner', 'intermediate', 'advanced'];

  const tagsDictionary = dictionaryGenerator(tags);
  const categoriesDictionary = dictionaryGenerator(categories);

  const videos = VideosTags.map(video => {
    return {
      title: video.title,
      description: video.title + video.tags.join(" "),
      videoPath: video.name,
      videoImagePath: getRandomItem(videosImages),
      category: categoriesDictionary[video.category]._id,
      tags: video.tags.map(tag => { return tagsDictionary[tag]._id}),
      isFree: true,
      level:  getRandomItem(levelsList),
      userId: '6453f4d29be8b6f9e65573db'
    }
  });

  Video.insertMany(videos);
}

/**
 * return a random item in the list
 * 
 * @param {Array} list 
 * @returns 
 */
const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

/**
 * takes an array of documents and reutrn dictionary where key represent name of object and value equal object id
 * 
 * @param {Array} elements 
 * @returns {dictionary}
 */
const dictionaryGenerator = (elements) => {

  const result = [...elements].reduce((dictionary, element) => {
    var name = element.name
    dictionary[name] = {_id: element._id.toString()}
    return dictionary;
  }, {})

  return result;
}

module.exports = videosFactory;