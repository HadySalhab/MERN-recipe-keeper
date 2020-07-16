// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.register = (req, res, next) => {
	res.status(200).json({
		msg: "registered",
	});
};

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
