const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const studentRouter = require("./routers/student-router.js");
const billRouter = require("./routers/bill-router.js");
const announceRouter = require("./routers/announce-router.js");
const courseRouter = require("./routers/course-router.js");
const userRouter = require("./routers/user-router.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/users", userRouter);
app.use("/student", studentRouter);
app.use("/bill", billRouter);
app.use("/announce", announceRouter);
app.use("/course", courseRouter);

app.listen(5000, () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => {});
});
