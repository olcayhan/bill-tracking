const express = require("express");
const router = express.Router();
const Course = require("../models/course-model.js");
const Bill = require("../models/bill-model.js");
const Student = require("../models/student-model.js");


router.post("/add", async (req, res) => {
    try {
        console.log(req.body)
        const newCourse = new Course({
            courseName: req.body.courseName,
            date: req.body.date,
            localDate: req.body.localDate,
            adminID: req.body.adminID
        });

        await newCourse.save();
        console.log(req.body);
        return res.send({ message: "Kurs Eklendi", Course: newCourse });
    } catch (e) {
        return res.send({ e: e });
    }

});

router.get("/get", async (req, res) => {
    try {
        return res.send({ courses: await Course.find().sort({ date: -1 }) });
    } catch (e) {
        return res.send({ e: e, m: "error" });
    }

});


router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;



        const course = await Course.findById({ _id: id });
        const result = await Student.find({})

        result.map(async (student) => {
            let updatedCourses = student?.courses.filter((item) => {
                return item.class !== course?.courseName
            })
            console.log(updatedCourses)
            await Student.findByIdAndUpdate(
                { _id: student.id },
                { $set: { courses: updatedCourses } }
            )
        })
        await Course.deleteOne({ _id: id });
        await Bill.deleteMany({ courseID: id })

        return res.send({ result })
    } catch (e) {
        return res.send({ e: e, m: "error" });
    }
})

module.exports = router;