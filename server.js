const express = require("express")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/config.env" })
const morgan = require("morgan")

const connectDB = require("./config/db")

// route import
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

// custom middleware import
const errorHandler = require("./middleware/err")

// connect to DB
connectDB()
const app = express()

// dev logging middleware
app.use(morgan('dev'))


// middleware
app.use(express.json())

// Mount rouers
app.use("/api/v1/bootcamps", bootcamps)
app.use("/api/v1/courses", courses)


app.get("/", (req, res) => {
    res.send("hello")
})


// error Handler Middleware
app.use(errorHandler)





app.listen(process.env.PORT, () => console.log(`App is running at port: ${process.env.PORT}`))
