const express = require("express");
const {
  getBootcamps,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcampController");
const router = express.Router();

const courseRouter = require("./coursesRoutes");

//Re-route into other resource routes
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/:id/photo").put(bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
