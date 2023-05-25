
const asyncHandler = require('express-async-handler')

const Bootcamp = require("../models/bootcamp");
const ErrorResponse = require('../utils/errorResponse');
const errorHander = require('../middleware/error');


/*******************************************
 * @desc Get all bootcamps
 * @route GET /api/v1/bootcamps 
 * @access Public
 *******************************************/


exports.getBootcamps = asyncHandler(async (req, res) => {

    const bootcamps = await Bootcamp.find();

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })

})

/*******************************************
 * @desc Get single bootcamp
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 *******************************************/

exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)


    if (!bootcamp) {
        return next(new errorHander(`No bootcamp found with id : ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })
})


/*******************************************
 * @desc create new Bootcamp
 * @route POST /api/v1/bootcamps/
 * @access Private
 *******************************************/

exports.createBootcamp = asyncHandler(async (req, res) => {

    const bootcamp = await Bootcamp.create(req.body)

    res.status(200).json({
        success: true,
        data: bootcamp,
    })
})


/*******************************************
 * @desc Update Bootcamp
 * @route PUT /api/v1/bootcamps/:id
 * @access Private
 *******************************************/

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(new ErrorResponse(`Bootcamp not found with the id: ${id}`, 404))
    }

    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })


    res.status(200).json({
        success: true,
        data: bootcamp
    })
})


/*******************************************
 * @desc Delte Bootcamp
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 *******************************************/

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })
})

