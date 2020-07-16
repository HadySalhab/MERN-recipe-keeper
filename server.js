const dotenv = require("dotenv");
dotenv.config({
	path: "./config/config.env",
});
const express = require("express");
const app = express();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipes"));

app.get("/", (req, res, next) => {
	res.status(200).json({
		success: true,
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
