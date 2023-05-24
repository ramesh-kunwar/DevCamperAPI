
const asyncHandler = require('express-async-handler')

const Bootcamp = require("../models/bootcamp")


/*******************************************
 * @desc Get all bootcamps
 * @route GET /api/v1/bootcamps 
 * @access Public
 *******************************************/


exports.getBootcamps = (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'All bootcamp '
    })

}

/*******************************************
 * @desc Get single bootcamp
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 *******************************************/

exports.getBootcamp = (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Single bootcamp '
    })
}


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

exports.updateBootcamp = (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Bootcamp Updated '
    })
}


/*******************************************
 * @desc Delte Bootcamp
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 *******************************************/

exports.deleteBootcamp = (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Bootcamp Deleted '
    })
}

