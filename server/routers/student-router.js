const express = require("express");
const router = express.Router();
const Student = require("../models/student-model.js");
const Bill = require("../models/bill-model.js");

router.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const newStudent = new Student({
      date: req.body.date,
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      courses: req.body.courses,
    });

    await newStudent.save();

    return res.send({ message: "Öğrenci Eklendi", Student: newStudent });
  } catch (e) {
    return res.send({ e: e });
  }
});

router.get("/get", async (req, res) => {
  try {
    return res.send({ students: await Student.find() });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});
router.post("/update", async (req, res) => {
  try {
    const { studentID, course } = req.body;
    const result = await Student.findByIdAndUpdate(
      { _id: studentID },
      { $push: { courses: { course } } },
      { new: true }
    );
    return res.send({ result });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    console.log(req.body);
    const result = await Student.findByIdAndDelete({ _id: req.body._id });
    const bills = await Bill.deleteMany({ studentID: req.body._id });
    return res.send({ result, bills });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});

module.exports = router;
