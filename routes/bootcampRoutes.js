const express = require("express");
const {
  getBootcamps,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcampController");
const Bootcamp = require("../models/bootcamp");
const router = express.Router();

const courseRouter = require("./coursesRoutes");
const { protect } = require("../middleware/auth");

// const advancedResults = require("../middleware/advanceResult");

//Re-route into other resource routes
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(protect, createBootcamp);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);
// router.route.get(advancedResults(Bootcamp, "bootcamp"), getBootcamp)

router
  .route("/:id")
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
