const express = require("express");
const Record = require("../models/Record");
const router = express.Router();

/* Create record */
router.post("/", async (req, res) => {
  const record = new Record(req.body);
  await record.save();
  res.json(record);
});

/* Get records (with filter) */
router.get("/", async (req, res) => {
  const { search } = req.query;

  let query = {};
  if (search) {
    query = {
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    };
  }

  const records = await Record.find(query).sort({ createdAt: -1 });
  res.json(records);
});

module.exports = router;
