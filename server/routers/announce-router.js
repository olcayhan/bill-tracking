const express = require("express");
const router = express.Router();
const Announce = require("../models/announce-model.js");

router.post("/add", async (req, res) => {
  try {
    const announce = new Announce({
      message: req.body.message,
      localDate: req.body.localDate,
      date: req.body.date,
    });
    console.log(req.body);

    await announce.save();
    return res.send({ message: "Duyuru Eklendi", Announce: announce });
  } catch (err) {
    return res.send({ err: err, message: "error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const announce = await Announce.find().sort({ date: -1 });
    return res.send({ announce });
  } catch (err) {
    return res.send({ err: err, message: "error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Announce.findByIdAndDelete({ _id: req.params.id });
    return res.send({ result });
  } catch (e) {
    return res.send({ e: e, m: "error" });
  }
});

module.exports = router;
