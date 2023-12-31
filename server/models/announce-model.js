const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announceSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    localDate: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { collection: "announce" }
);

const Bill = mongoose.model("Announce", announceSchema);

module.exports = Bill;
