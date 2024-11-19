class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  let customError = { ...err }; // Crée une copie de l'erreur

  // Default error message and status code
  customError.message = customError.message || "Internal Server Error";
  customError.statusCode = customError.statusCode || 500;

  // Handle duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue).join(", ")} entered`;
    customError = new ErrorHandler(message, 400);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid, try again!";
    customError = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is expired, try again!";
    customError = new ErrorHandler(message, 400);
  }

  // Handle cast errors (e.g., invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    const message = `Invalid value for ${err.path}: ${err.value}`;
    customError = new ErrorHandler(message, 400);
  }

  // Handle validation errors
  const errorMessage = customError.errors
    ? Object.values(customError.errors)
        .map((error) => error.message)
        .join(" ")
    : customError.message;

  // Return error response
  return res.status(customError.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

// Exporting the ErrorHandler class for usage in other parts of the application
export default ErrorHandler;