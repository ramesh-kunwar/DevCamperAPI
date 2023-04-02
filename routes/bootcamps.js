const express = require("express")
const { getBootcamps, createBootcamp, getBootcamp , updateBootcamp,deleteBootcamp} = require("../controllers/bootcamp")

// include other recource routers
const courseRouter = require("./courses")


const router = express.Router()

// Re-route into other recource routers
// router.use("/:bootcampId/courses", courseRouter)


router.get("/bootcamps", getBootcamps)
router.post("/bootcamps/:id", createBootcamp)
router.get("/bootcamps/:id", getBootcamp)
router.put("/bootcamps/:id", updateBootcamp)
router.delete("/bootcamps/:id", deleteBootcamp)


module.exports = router;