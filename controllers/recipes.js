const asyncHandler = require("../middleware/async");
const Recipe = require("../models/Recipe");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all user recipes
// @route     GET /api/recipes
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
exports.createRecipe = asyncHandler(async (req, res, next) => {
	const { name, ingredients, direction } = req.body;
	const newRecipe = new Recipe({
		name,
		ingredients,
		direction,
		user: req.userId,
	});
	const recipe = await newRecipe.save();
	res.status(201).json({
		success: true,
		data: recipe,
	});
});

// @desc      Update user recipe
// @route     PUT /api/recipes/:recipeId
// @access    Private
exports.updateRecipe = asyncHandler(async (req, res, next) => {
	let recipe = await Recipe.findById(req.params.recipeId);
	if (!recipe) {
		return next(new ErrorResponse("Recipe not found", 404));
	}
	// Make sure user owns the recipe
	if (recipe.user.toString() !== req.userId) {
		return next(new ErrorResponse("Not Authorized", 401));
	}
	recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: recipe,
	});
});

// @desc      Delete user recipe
// @route     DELETE /api/recipes/:recipeId
// @access    Private
exports.deleteRecipe = (req, res, next) => {
	res.status(200).json({
		msg: "delete recipe",
	});
};
