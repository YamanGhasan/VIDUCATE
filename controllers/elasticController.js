const { Client } = require("@elastic/elasticsearch");
const Video = require("../models/videoModel");
const client = new Client({ node: "http://localhost:9200" });

let isIndexingDone = false;

async function indexVideos() {
  // Fetch all videos from MongoDB
  const videos = await Video.find();
  // Index each video in Elasticsearch
  for (const video of videos) {
    await client.index({
      index: "videos",
      body: {
        title: video.title,
        description: video.description,
        videoPath: video.videoPath,
        videoImagePath: video.videoImagePath,
        category: video.category,
        tags: video.tags,
        isFree: video.isFree,
        videoLevel: video.videoLevel,
        timestamp: video.timestamp,
        userId: video.userId,
      },
    });
  }
}

async function syncVideos() {
  try {
    if (!isIndexingDone) {
      indexVideos();
      isIndexingDone = true;
    }
    // Create a MongoDB change stream
    const changeStream = Video.watch();
    changeStream.on("change", async (change) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "update"
      ) {
        // Get the updated video from MongoDB
        const video = await Video.findById(change.documentKey._id);
        // Index the updated video in Elasticsearch
        await client.index({
          index: "videos",
          id: video._id.toString(),
          body: {
            title: video.title,
            description: video.description,
            videoPath: video.videoPath,
            videoImagePath: video.videoImagePath,
            category: video.category,
            tags: video.tags,
            isFree: video.isFree,
            videoLevel: video.videoLevel,
            timestamp: video.timestamp,
            userId: video.userId,
          },
          refresh: true, // this parameter ensures that the index is immediately refreshed after indexing
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

const searchVideos = async (req, res) => {
  syncVideos();
  const { searchquery } = req.query;
  const searchFields = ["title", "description", "category", "tags"];
  const query = {
    multi_match: {
      query: searchquery,
      fields: searchFields,
      type: "best_fields",
      fuzziness: "auto",
      operator: "or",
      lenient: true,
    },
  };
  try {
    const { hits } = await client.search({ index: "videos", body: { query } });
    const videos = hits.hits.map((hit) => hit._source);
    res.render("searchResults", {
      title: "Search Results",
      videos,
      searchquery,
    });
  } catch (err) {
    console.error(err);
  }
};
module.exports = { client, searchVideos };
