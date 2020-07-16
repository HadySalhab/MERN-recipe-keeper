const express = require("express");
const {
	getRecipes,
	createRecipe,
	updateRecipe,
	deleteRecipe,
} = require("../controllers/recipes");
const router = express.Router();

router.get("/", getRecipes);
router.post("/", createRecipe);
router.put("/:recipeId", updateRecipe);
router.delete("/:recipeId", deleteRecipe);

module.exports = router;
