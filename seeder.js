const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./config/config.env"})

//load models
const Bootcamp = require("./models/bootcamp")