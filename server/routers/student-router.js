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
    const id = req.params;
    return res.send({ students: await Student.find() });
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

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const student = await Student.findOne({ email: email });
    if (!student)
      return res.status(400).json({ message: "E-mail ve Şifre Hatalı" });
    if (student.password !== password)
      return res.status(400).json({ message: "Şifreniz Hatalı" });
    return res.status(200).json({ student, message: "Giriş Başarılı" });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});

module.exports = router;
