const express = require("express");
const studentRouter = require("./routers/student-router.js");
const billRouter = require("./routers/bill-router.js");
const announceRouter = require("./routers/announce-router.js");
const courseRouter = require("./routers/course-router.js");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 80");
});

require("./mongo-connection.js");

app.use("/student", studentRouter);
app.use("/bill", billRouter);
app.use("/announce", announceRouter);
app.use("/course", courseRouter);
