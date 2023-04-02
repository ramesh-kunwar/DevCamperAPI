const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Bootcamp = require("../models/bootcamp")

/**********************************
 *  @desc Get all  Bootcamps
 *  @route GET / api/v1/bootcamps
 *  @access public
 **********************************/

exports.getBootcamps = asyncHandler(async (req, res, next) => {

    const bootcamps = await Bootcamp.find()
    if (!bootcamps) {
        next(new ErrorResponse(`Bootcamp not found`, 404))
    }
    res.status(200).json({ success: true, data: bootcamps })

})

/**********************************
 *  @desc Create bootcamp
 *  @route POST / api/v1/bootcamps/:id
 *  @access public
 **********************************/

exports.createBootcamp = asyncHandler(async (req, res) => {

    const bootcamp = await Bootcamp.create(req.body)

    if (!bootcamp) {
        res.status(400).json({
            success: false,
        })


    }
    res.status(201).json({
        success: true,
        data: bootcamp
    })

})

/**********************************
 *  @desc  Get single Bootcamp
 *  @route GET / api/v1/bootcamps/:id
 *  @access public
 **********************************/

exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })


})

/**********************************
 *  @desc  Update Bootcamp
 *  @route PUT / api/v1/bootcamps/:id
 *  @access private
 **********************************/

exports.updateBootcamp = asyncHandler(async (req, res) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // when we get response the data should be updated
        runValidators: true,

    })

    if (!bootcamp) {
        res.status(400).json({
            success: false
        })

    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })

})


/**********************************
 *  @desc  Delete Bootcamp
 *  @route DELETE / api/v1/bootcamps/:id
 *  @access private
 **********************************/

exports.deleteBootcamp = asyncHandler(async (req, res) => {

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp) {
        res.status(400).json({
            success: false
        })
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })

})