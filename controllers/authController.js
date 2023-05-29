const asyncHandler = require("express-async-handler");

const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");
/*******************************************
 * @desc  Regsiter User
 * @route GET /api/v1/register
 * @access Public
 *******************************************/

exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Register user"
  });
});
