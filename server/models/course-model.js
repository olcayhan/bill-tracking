const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    localDate: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { collection: "course" }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
