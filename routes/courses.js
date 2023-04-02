const express = require("express")
const { getCourses, addCourses, getCoursesBootcamp, getCourse } = require("../controllers/courses")
const router = express.Router()

router.route("/courses").get(getCourses)
router.route("/courses/:id").get(getCourse)
router.route("/bootcamps/:bootcampId/courses").post(addCourses)

// get course by bootcamp
router.get("/bootcamps/:bootcampId/courses",  getCoursesBootcamp)



module.exports = router;