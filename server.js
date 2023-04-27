const express = require("express")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/config.env" })
const morgan = require("morgan")

const connectDB = require("./config/db")

// route import
const bootcamps = require('./routes/bootcamps')

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


app.get("/", (req, res) => {
    res.send("hello")
})


// error Handler Middleware
app.use(errorHandler)





app.listen(process.env.PORT, () => console.log(`App is running at port: ${process.env.PORT}`))
