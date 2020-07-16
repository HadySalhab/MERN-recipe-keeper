const bcrypt = require("../utils/bcrypt");
const User = require("../models/User");
const jwt = require("../utils/jwt");
const asyncHandler = require("../middleware/async");

// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = new User({ name, email, password });
	user.password = await bcrypt.getHashPass(user.password);
	await user.save();
	sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = (req, res, next) => {
	res.status(200).json({
		msg: "login",
	});
};

// @desc      Logout user
// @route     Get /api/auth/logout
// @access    Public
exports.logout = (req, res, next) => {
	res.status(200).json({
		msg: "logout",
	});
};

// @desc      Get login user
// @route     Get /api/auth/me
// @access    Private
exports.getMe = (req, res, next) => {
	res.status(200).json({
		msg: "me",
	});
};

const sendTokenResponse = (user, statusCode, res) => {
	const token = jwt.getSignedToken(user._id);
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	if (process.env.NODE_ENV === "production") {
		options.secure = true;
	}
	//cookie to help the client side to store the token in the browser cookie
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
	});
};
