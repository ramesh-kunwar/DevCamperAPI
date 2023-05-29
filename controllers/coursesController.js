const asyncHandler = require("express-async-handler");

const Courses = require("../models/course");
const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/bootcamp");

/*******************************************
 * @desc Get all courses
 * @route GET /api/v1/courses/
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @access Public
 *******************************************/

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  // get courses related to particular bootcamp

  if (req.params.bootcampId) {
    query = Courses.find({ bootcamp: req.params.bootcampId });
  } else {
    console.log(query);
    query = Courses.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    data: courses,
  });
});

/*******************************************
 * @desc Get single course
 * @route GET /api/v1/courses/:id
 * @access Public
 *******************************************/

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course witht the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

/*******************************************
 * @desc Add A course
 * @route POST /api/v1/bootcamps/:bootcampId/courses
 * @access Private
 *******************************************/

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp witht the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const course = await Courses.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

/*******************************************
 * @desc Update course
 * @route PUT /api/v1/courses/:Id
 * @access Private
 *******************************************/

exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course witht the id of ${req.params.id}`, 404)
    );
  }

  course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

/*******************************************
 * @desc Delete course
 * @route DELETE /api/v1/courses/:Id
 * @access Private
 *******************************************/

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course witht the id of ${req.params.id}`, 404)
    );
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    data: course,
  });
});
