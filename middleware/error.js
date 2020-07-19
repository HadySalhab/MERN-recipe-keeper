const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;
	// Log to console for dev
	// console.log(err);

	// Mongoose bad ObjectId
	if (err.name === "CastError") {
		error = handleCastErrorDB(error);
	}
	// Mongoose duplicate key
	if (err.code === 11000) {
		error = handleDuplicateFieldsDB(error);
	}

	// Mongoose validation error
	if (err.name === "ValidationError") {
		error = handleValidationErrorDB(error);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error",
	});
};

// convert mongoose exception to custom ErrorResponse obj

const handleDuplicateFieldsDB = (err) => {
	const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new ErrorResponse(message, 400);
};
const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join(". ")}`;
	return new ErrorResponse(message, 400);
};
const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new ErrorResponse(message, 400);
};
module.exports = errorHandler;
