require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Dev logging middleware
app.use(morgan("tiny"));

app.use(fileupload());

// Importing All Routes
const bootcamps = require("./routes/bootcampRoutes");
const courses = require("./routes/coursesRoutes");
const auth = require("./routes/authRoutes");
const errorHander = require("./middleware/error");

// initial route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from express",
    // message: req.hello
  });
});

// mounting routers to specific url
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

// error handler middleware
app.use(errorHander);

// listening to the port
app.listen(process.env.PORT, () =>
  console.log(`App is running at port ${process.env.PORT}`)
);
