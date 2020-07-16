const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please add a name"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please add an email"],
		unique: true,
		trim: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please add a valid email",
		],
	},
	password: {
		type: String,
		require: [true, "Please add a password"],
		minlength: [6, "Password length should be greater than 6 characters"],
		select: false,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("user", UserSchema);
