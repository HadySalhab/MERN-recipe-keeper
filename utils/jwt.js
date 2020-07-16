const jwt = require("jsonwebtoken");

jwt.getSignedToken = function (id) {
	return this.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

module.exports = jwt;
