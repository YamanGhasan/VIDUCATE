const { Categories } = require('../utils/factoriesData');


const Category = require('../models/category');

/**
 * insert pre-defined list of categories into database.
 */
async function categoriesFactory() {
	await Category.insertMany(Categories);
}

module.exports = categoriesFactory;