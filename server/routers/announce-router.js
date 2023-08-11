const express = require("express");
const router = express.Router();
const Announce = require("../models/announce-model.js");

router.post("/add", async (req, res) => {
  try {
    const announce = new Announce({
      userId: req.body.userId,
      message: req.body.message,
      localDate: req.body.localDate,
      date: req.body.date,
    });

    await announce.save();
    return res.send({ message: "Duyuru Eklendi", Announce: announce });
  } catch (err) {
    return res.send({ err: err, message: "error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const announce = await Announce.find({ userId: req.params.id }).sort({ date: -1 });
    return res.send({ announce });
  } catch (err) {
    return res.send({ err: err, message: "error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Announce.findByIdAndDelete({ _id: req.params.id });
    return res.send({ result });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});

module.exports = router;
