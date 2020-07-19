const dotenv = require("dotenv");
dotenv.config({
	path: "./config/config.env",
});
const path = require("path");

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const app = express();
connectDB();

// Init Middlewares
app.use(express.json());

// Mounting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipes"));
app.use(errorHandler);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
//Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
	console.log(`${err.message}`);
	//close server and exit the process
	server.close(() => {
		process.exit(1);
	});
});
