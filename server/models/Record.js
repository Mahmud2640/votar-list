const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    serialNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    voterNo: {
      type: String,
      required: true,
      unique: true,
    },
    house: {
      type: String,
    },
    holdingNo: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto
  }
);

module.exports = mongoose.model("Record", recordSchema);
