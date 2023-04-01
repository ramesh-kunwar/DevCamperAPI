const express = require("express")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/config.env" })
const morgan = require("morgan")

const connectDB = require("./config/db")

const bootcampsRoutes = require("./routes/bootcamps")

// connect to DB
connectDB()
const app = express()

// middleware
app.use(express.json())

// Mount rouers




app.use("/api/v1",bootcampsRoutes )





app.listen(process.env.PORT, () => console.log(`App is running at port: ${process.env.PORT}`))