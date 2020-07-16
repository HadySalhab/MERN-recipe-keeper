const express = require("express");
const {
	getRecipes,
	createRecipe,
	updateRecipe,
	deleteRecipe,
} = require("../controllers/recipes");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/", protect, getRecipes);
router.post("/", protect, createRecipe);
router.put("/:recipeId", protect, updateRecipe);
router.delete("/:recipeId", protect, deleteRecipe);

module.exports = router;
