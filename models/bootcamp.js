const mongoose = require("mongoose");
const slugify = require("slugify");

const bootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      unique: true,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      // this is going to be generated
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate with virutals
bootcampSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false,
});

// Cascalde delete course when a bootcamp is deleted
bootcampSchema.pre("remove", async function (next) {
  console.log(`Courses being removed from bootcamp ${this._id}`);
  await this.model("Course").deleteMany({ bootcamp: this._id });
  next();
});

// Create bootcamp slug from the name
bootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(this.slug);
  next();
});

module.exports = mongoose.model("Bootcamp", bootcampSchema);
