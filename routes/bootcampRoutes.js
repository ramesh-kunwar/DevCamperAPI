const express = require("express");
const {
  getBootcamps,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcampController");
const Bootcamp = require("../models/bootcamp")
const router = express.Router();

const courseRouter = require("./coursesRoutes");

// const advancedResults = require("../middleware/advanceResult");
 
//Re-route into other resource routes
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/:id/photo").put(bootcampPhotoUpload);
// router.route.get(advancedResults(Bootcamp, "bootcamp"), getBootcamp)

router
  .route("/:id")
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
