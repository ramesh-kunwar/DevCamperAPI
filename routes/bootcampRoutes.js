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
const { protect, authorize } = require("../middleware/auth");

// const advancedResults = require("../middleware/advanceResult");

//Re-route into other resource routes
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);
// router.route.get(advancedResults(Bootcamp, "bootcamp"), getBootcamp)

router
  .route("/:id")
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
