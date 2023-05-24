const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config({ path: './config/config.env' })

const app = express()

app.get("/", (req, res) => {
    res.send("Hello from express")
})

app.listen(process.env.PORT, () => console.log(`App is running at port ${process.env.PORT}`))