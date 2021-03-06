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
		unique: [true, "Email already exists"],
		trim: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please add a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "Please add a password"],
		minlength: [
			6,
			"Password length should be greater than or equal to 6 characters",
		],
		select: false,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("user", UserSchema);
