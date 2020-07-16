const bcrypt = require("bcryptjs");

bcrypt.getHashPass = async function (password) {
	if (!password) {
		return;
	}
	const salt = await bcrypt.genSalt(10);
	return this.hash(password, salt);
};
module.exports = bcrypt;
