const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	name: {
		type: String,
		required: true,
	},
	ingredients: {
		type: [String],
		required: true,
		validate: [
			(v) => Array.isArray(v) && v.length > 0,
			"please add ingredients",
		],
	},
	direction: {
		type: String,
		required: true,
		minlength: [
			50,
			"Direction should be greater than or equal to 50 characters",
		],
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});
module.exports = mongoose.model("recipe", RecipeSchema);
