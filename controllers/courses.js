const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Course = require("../models/course")
const Bootcamp = require("../models/bootcamp")

/**********************************
 *  @desc Get Courses by
 *  @route GET / api/v1/bootcamps/:bootcampId/courses
 *  @access public
 **********************************/
exports.getCoursesBootcamp = asyncHandler(async (req, res, next) => {

    const courses = await Course.find({ bootcamp: req.params.bootcampId }).populate({
        path: "bootcamp",
        select: "name description"
    })
    if (!courses) {
        next(new ErrorResponse("Courses not found", 404))
    }

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})

/**********************************
 *  @desc Get Single course by
 *  @route GET / api/v1/courses/:id/
 *  @access public
 **********************************/
exports.getCourse = asyncHandler(async (req, res, next) => {

    const courses = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description"
    })
    if (!courses) {
        next(new ErrorResponse("Courses not found", 404))
    }

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})

/**********************************
 *  @desc Get Courses
 *  @route GET / api/v1/bootcamps/:bootcampId/courses
 *  @access public
 **********************************/

exports.getCourses = asyncHandler(async (req, res, next) => {

    const courses = await Course.find();

    if (!courses) {
        next(new ErrorResponse("Courses not found", 404))
    }

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})


/**********************************
 *  @desc Add courses
 *  @route POST / api/v1/bootcamps/:bootcampId/courses
 *  @access public
 **********************************/

exports.addCourses = asyncHandler(async (req, res, next) => {
    // get bootcamp id
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) {
        next(new ErrorResponse("Courses not found", 404))
    }
    const course = await (await Course.create(req.body)).populate("bootcamp")
    res.status(201).json({
        success: true,
        data: course
    })

})

exports.updateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(201).json({
        success: true,
        data: course
    })

})
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    return res.status(201).json({
        success: true,
        data: course
    })

})
