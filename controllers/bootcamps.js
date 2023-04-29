const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Bootcamp = require("../models/bootcamp")


/**
 * 
 * @desc  Get all bootcamps
 * @route GET / api/v1/bootcamps
 * @access Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    let query;

    // copy req.query 
    const reqQuery = { ...req.query }

    // Fields to exclude
    const removeFields = ['select', 'sort', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])


    // to manipulate query we have to first convert to string
    let queryStr = JSON.stringify(reqQuery)

    // converting the query sting to $gt or $gte...
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)



    // Finding resource
    query = Bootcamp.find(JSON.parse(queryStr)).populate({path:'courses', select:"title description"})




    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(",").join(' ')
        query = query.select(fields)
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(' ')
        query = query.sort(sortBy)

    } else {
        query = query.sort("-createdAt") // - means descending
    }


    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments()

    query = query.skip(startIndex).limit(limit)

    // Executing query
    const bootcamps = await query

    // pagination result
    const pagination = {}

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        }
    }


    res.status(200).json({
        success: true,
        // count: total,
        pagination,
        data: bootcamps
    })

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


