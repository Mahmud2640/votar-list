const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Record", recordSchema);
