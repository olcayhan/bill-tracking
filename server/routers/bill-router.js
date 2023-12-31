const express = require("express");
const router = express.Router();
const Bill = require("../models/bill-model.js");
const Student = require("../models/student-model.js");

router.put("/toggle", async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: { isPaid: !req.body.isPaid } }
    );
    return res.send({ updatedBill });
  } catch (err) {
    return res.send({ err: err, message: "error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newBill = new Bill({
      userId: req.body.userId,
      studentID: req.body.studentID,
      courseID: req.body.courseID,
      date: req.body.date,
      class: req.body.class,
      isPaid: req.body.isPaid,
      localDate: req.body.localDate,
    });

    await newBill.save();
    return res.send({ message: "Fatura Eklendi", Bill: newBill });
  } catch (e) {
    return res.send({ e: e });
  }
});

router.get("/pull/:id", async (req, res) => {
  try {
    let bills = await Bill.find({ userId: req.params.id });
    bills = bills.filter((bill) => Date.parse(bill.date) <= Date.now());
    return res.send({ bills });
  } catch (err) {
    return res.send({ err: err, m: "error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let student = await Student.findOne({ _id: req.params.id });
    if (student === undefined) {
      return res.send({ m: "Student not found" });
    }
    let bills = await Bill.find({ studentID: student._id });
    return res.send({ bills });
  } catch (err) {
    return res.send({ err: err, m: "error" });
  }
});

module.exports = router;
