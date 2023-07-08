const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlenght: 20,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: {
      type: Array,
    },
  },
  { collection: "students" }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
