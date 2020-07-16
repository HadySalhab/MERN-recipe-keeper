// @desc      Get all user recipes
// @route     GET /api/recipes

const asyncHandler = require("../middleware/async");
const Recipe = require("../models/Recipe");

// @access    Private
exports.getRecipes = asyncHandler(async (req, res, next) => {
	const recipes = await Recipe.find({ user: req.userId }).sort({ date: -1 });
	res.status(200).json({
		success: true,
		count: recipes.length,
		data: recipes,
	});
});

// @desc      Create user recipe
// @route     POST /api/recipes
// @access    Private
exports.createRecipe = (req, res, next) => {
	res.status(200).json({
		msg: "create recipe",
	});
};

// @desc      Update user recipe
// @route     PUT /api/recipes/:recipeId
// @access    Private
exports.updateRecipe = (req, res, next) => {
	res.status(200).json({
		msg: "update recipe",
	});
};

// @desc      Delete user recipe
// @route     DELETE /api/recipes/:recipeId
// @access    Private
exports.deleteRecipe = (req, res, next) => {
	res.status(200).json({
		msg: "delete recipe",
	});
};
