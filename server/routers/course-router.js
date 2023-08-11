const express = require("express");
const router = express.Router();
const Course = require("../models/course-model.js");
const Bill = require("../models/bill-model.js");
const Student = require("../models/student-model.js");

router.post("/add", async (req, res) => {
  try {
    const newCourse = new Course({
      userId: req.body.userId,
      courseName: req.body.courseName,
      date: req.body.date,
      localDate: req.body.localDate,
    });

    await newCourse.save();
    return res.send({ message: "Kurs Eklendi", Course: newCourse });
  } catch (e) {
    return res.send({ e: e });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    return res.send({ courses: await Course.find({userId:req.params.id}).sort({ date: -1 }) });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById({ _id: id });
    const result = await Student.find({});

    result.map(async (student) => {
      let updatedCourses = student?.courses.filter((item) => {
        return item.class !== course?.courseName;
      });
      await Student.findByIdAndUpdate(
        { _id: student.id },
        { $set: { courses: updatedCourses } }
      );
    });
    await Course.deleteOne({ _id: id });
    await Bill.deleteMany({ courseID: id });

    return res.send({ result });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});

module.exports = router;
