const asyncHandler = require("express-async-handler");

const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");

/*******************************************
 * @desc  Regsiter User
 * @route POST /api/v1/auth/register
 * @access Public
 *******************************************/

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create a user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // create token
  const token = user.getSignedJwtToken();
  //   user.token = token;
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});

/*******************************************
 * @desc  Regsiter User
 * @route POST /api/v1/auth/login
 * @access Public
 *******************************************/

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide email and password`, 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // create token
  const token = user.getSignedJwtToken();
  //   user.token = token;
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});
