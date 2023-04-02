const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Bootcamp = require("../models/bootcamp")

/**********************************
 *  @desc Get all  Bootcamps
 *  @route GET / api/v1/bootcamps
 *  @access public
 **********************************/

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query

    // copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', "sort", "page", "limit"]

    // loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])
    console.log(reqQuery);

    // create query String
    let queryStr = JSON.stringify(reqQuery)

    // create operators ($gt, $get, etc)
    queryStr = queryStr.replace(/\b(gt\|get|lt|lte|in)\b/g, match => `$${match}`)

    // finding recourcce
    query = Bootcamp.find(JSON.parse(queryStr)).populate({
        path: "courses"
        // , select: ["title description"]
    })

    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ")
        query = query.select(fields)
        console.log(fields);
    }

    // sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ")
        query = query.sort(sortBy)
    } else {
        // default sort by date
        query = query.sort("-createdAt") // - for descending
    }

    //pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments()

    query = query.skip(startIndex).limit(limit)


    // executing query
    const bootcamps = await query;

    // pagination result 
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    if (!bootcamps) {
        next(new ErrorResponse(`Bootcamp not found`, 404))
    }
    res.status(200).json({
        success: true,
        count: bootcamps.length, pagination,
        data: bootcamps
    })

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