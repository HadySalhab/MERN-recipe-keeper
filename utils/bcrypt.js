const bcrypt = require("bcryptjs");

bcrypt.getHashPass = async function (password) {
	if (!password) {
		return;
	}
	const salt = await bcrypt.genSalt(10);
	return this.hash(password, salt);
};
bcrypt.matchPasswords = async function (password, hashedPassword) {
	return await this.compare(password, hashedPassword);
};
module.exports = bcrypt;
