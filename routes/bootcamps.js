const express = require("express")
const { getBootcamps, createBootcamp, getBootcamp , updateBootcamp,deleteBootcamp} = require("../controllers/bootcamp")
const router = express.Router()

router.get("/bootcamps", getBootcamps)
router.post("/bootcamps/:id", createBootcamp)
router.get("/bootcamps/:id", getBootcamp)
router.put("/bootcamps/:id", updateBootcamp)
router.delete("/bootcamps/:id", deleteBootcamp)


module.exports = router;