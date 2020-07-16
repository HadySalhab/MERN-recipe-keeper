const dotenv = require("dotenv");
dotenv.config({
	path: "./config/config.env",
});

const colors = require("colors");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
