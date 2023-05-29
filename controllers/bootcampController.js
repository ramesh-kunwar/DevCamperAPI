const asyncHandler = require("express-async-handler");
const path = require("path");
const Bootcamp = require("../models/bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const errorHander = require("../middleware/error");

/*******************************************
 * @desc Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access Public
 *******************************************/

exports.getBootcamps = asyncHandler(async (req, res) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery

  console.log(req.query, "req query ");

  removeFields.forEach((param) => {
    console.log(req.query[param]);
    console.log(param, "param");
    delete reqQuery[param];
  });

  let queryStr = JSON.stringify(reqQuery);

  // here we are adding $ in gt | gte | lte...
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Findign resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate({ path: "courses" });

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");

    query = query.sort(sortBy);
  } else {
    query = query.sort("name");
  }

  // SELECT Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");

    query = query.select(fields);
  }

  // PAGINATION
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // PAGINATION RESULT
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

/*******************************************
 * @desc Get single bootcamp
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 *******************************************/

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp found with id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

/*******************************************
 * @desc create new Bootcamp
 * @route POST /api/v1/bootcamps/
 * @access Private
 *******************************************/

exports.createBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

/*******************************************
 * @desc Update Bootcamp
 * @route PUT /api/v1/bootcamps/:id
 * @access Private
 *******************************************/

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(
      new ErrorResponse(`Bootcamp not found with the id: ${id}`, 404)
    );
  }

  const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

/*******************************************
 * @desc Delte Bootcamp
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 *******************************************/

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  await bootcamp.deleteOne();
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

/*******************************************
 * @desc Upload photo for bootcamp
 * @route PUT /api/v1/bootcamps/:id/photo
 * @access Private
 *******************************************/

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // make sure the image is photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //create custom file name
  file.name = `photo_(${bootcamp._id})${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
