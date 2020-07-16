const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	// check if token is sent from the header.
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	//check if token is sent from cookie
	else if (req.cookies.token) {
		token = req.cookies.token;
	}

	if (!token) {
		return next(new ErrorResponse("No token, authorization denied", 401));
	}
	try {
		// verify token
		const decoded = await jwt.verify(token, process.env.JWT_SECRET); //throw exception if verification fails
		req.user = await User.findById(decoded.id);
		next();
	} catch (error) {
		return next(new ErrorResponse("Token is not valid", 401));
	}
});
