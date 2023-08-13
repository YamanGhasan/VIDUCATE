const { Tags } = require('../utils/factoriesData');

const Tag = require('../models/tag');

/**
 * insert pre-defined list of tags into database.
 */
async function createTags() {
	await Tag.insertMany(Tags);
}

module.exports = createTags;