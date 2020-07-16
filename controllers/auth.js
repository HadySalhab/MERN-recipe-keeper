const bcrypt = require("../utils/bcrypt");
const User = require("../models/User");
const jwt = require("../utils/jwt");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

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
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new ErrorResponse("Please provide an email and password", 400));
	}
	// check email
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorResponse("Invalid credentials", 401));
	}
	// check password
	const isMatch = await bcrypt.matchPasswords(password, user.password);
	if (!isMatch) {
		return next(new ErrorResponse("Invalid credentials", 401));
	}
	sendTokenResponse(user, 200, res);
});

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
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.userId); //private route: we can access user from protect middleware
	res.status(200).json({
		success: true,
		data: user,
	});
});

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
