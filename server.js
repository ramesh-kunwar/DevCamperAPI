const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config({ path: './config/config.env' })

const app = express()


// Importing All Routes
const bootcamps = require("./routes/bootcampRoutes")


// initial route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from express"
    })
})


// mounting routers to specific url
app.use("/api/v1/bootcamps", bootcamps)





// listening to the port
app.listen(process.env.PORT, () => console.log(`App is running at port ${process.env.PORT}`))