const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //   else if (req.cookies.token) {
  //     token = req.cookies.token;
  //   }

  // Make sure token is exists
  if (!token) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  // if token exists verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403 // 403 is a forbidden error
        )
      );
    }
    next();
  };
};
