const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Bootcamp = require("../models/bootcamp")
const path = require("path")
const advancedResults = require("../middleware/advancedResult")

/**
 * 
 * @desc  Get all bootcamps
 * @route GET / api/v1/bootcamps
 * @access Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {

   


    res.status(200).json(res.advancedResults)

}
)

/**
 * 
 * @desc  Get single bootcamp
 * @route GET / api/v1/bootcamp/:id
 * @access Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {


    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))

    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })

})

/**
 * 
 * @desc  Create New Bootcamp
 * @route POST / api/v1/bootcamps
 * @access Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {


    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
        success: true,
        data: bootcamp
    })

})

/**
 * 
 * @desc  Update Bootcamp
 * @route PUT / api/v1/bootcamps/:id
 * @access Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))

    }

    res.status(200).json({
        success: true,
        data: bootcamp,
    })
})


/**
 * 
 * @desc  Delete Bootcamp
 * @route DELETE / api/v1/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))

    }

    await bootcamp.deleteOne()
    res.status(200).json({
        success: true,
        data: bootcamp,
    })

})



/**
 * 
 * @desc  Upload photo for bootcamp
 * @route PUT / api/v1/bootcamps/:id/photo
 * @access Private
 */
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))

    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 404))

    }

    const file = req.files.file;

    // make sure that the  image is photo
    if (!file.mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please upload an image file`, 404))
    }

    // check file size
    if (file.size > 1000000) {
        return next(new ErrorResponse(`Please upload an image less than  1000000`, 404))
    }

    // Create custom file name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}` // here we are creating an image name with id

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500))

        }
        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name })
    })


    res.status(200).json({
        success: true,
        data: file.name,
    })

})


