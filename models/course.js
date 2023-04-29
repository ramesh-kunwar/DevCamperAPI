const mongoose = require('mongoose')
const Bootcamp = require("../models/bootcamp")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"]
    },
    description: {
        type: String,
        required: [true, "please add a description"]
    },
    weeks: {
        type: String,
        required: [true, "Please add number of weeks"]
    },
    tuition: {
        type: Number,
        required: [true, "Please add tuition cost"]

    },
    minimumSkill: {
        type: String,
        required: [true, "Please add a minimum skill"],
        enum: ['beginner', 'intermediate', 'advanced']

    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    // course is related to bootcamp
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true,
    }
})

module.exports = mongoose.model("Course", courseSchema)