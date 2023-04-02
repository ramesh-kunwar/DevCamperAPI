const mongoose = require("mongoose")
const Bootcamp = require("./bootcamp")
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"],
    },
    description: {
        type: String,
        required: [true, "Please add a course description"],

    },
    weeks: {
        type: String,
        required: [true, "Please add number of weeks"],

    },
    tuition: {
        type: Number,
        required: [true, "Please add a tuition cost"],

    },
    minimumSkill: {
        type: String,
        required: [true, "Please add a minimum skil"],
        enum: ["beginner", "intermediate", "advanced"]
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",// we are referencing a bootcamp model
        required: true,
    }
})

module.exports = mongoose.model("Course", courseSchema)