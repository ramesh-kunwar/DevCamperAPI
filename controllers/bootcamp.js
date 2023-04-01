
const Bootcamp = require("../models/bootcamp")

/**********************************
 *  @desc Get all  Bootcamps
 *  @route GET / api/v1/bootcamps
 *  @access public
 **********************************/

exports.getBootcamps = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({ success: true, data: bootcamps })

    } catch (error) {
        res.json({ success: false, error: error })
    }
}

/**********************************
 *  @desc Create bootcamp
 *  @route POST / api/v1/bootcamps/:id
 *  @access public
 **********************************/

exports.createBootcamp = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

/**********************************
 *  @desc  Get single Bootcamp
 *  @route GET / api/v1/bootcamps/:id
 *  @access public
 **********************************/

exports.getBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

/**********************************
 *  @desc  Update Bootcamp
 *  @route PUT / api/v1/bootcamps/:id
 *  @access private
 **********************************/

exports.updateBootcamp = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}


/**********************************
 *  @desc  Delete Bootcamp
 *  @route DELETE / api/v1/bootcamps/:id
 *  @access private
 **********************************/

exports.deleteBootcamp = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}