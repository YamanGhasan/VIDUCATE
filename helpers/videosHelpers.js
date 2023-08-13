require("dotenv").config();


const videosPreProcessor =  documents => {
  if (!Array.isArray(documents)) documents = [documents];

  const baseUrl = process.env.APP_URL;

  documents.forEach(document => {
    document.link = `${baseUrl}/video/${document._id}`;
    document.poster = `${baseUrl}/images/videosImages/${document.videoImagePath}`;
    document.videoSource = `${baseUrl}/video/get/${document._id}`;
    
  });
}

module.exports = {
  videosPreProcessor
}