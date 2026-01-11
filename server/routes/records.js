const express = require("express");
const Record = require("../models/Record");
const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  const record = new Record(req.body);
  await record.save();
  res.json(record);
});
/* READ (with filter + search) */
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim() !== "") {
      const trimmedSearch = search.trim();
      const numSearch = Number(trimmedSearch);

      const orArray = [
        { name: new RegExp(trimmedSearch, "i") },
        { fatherName: new RegExp(trimmedSearch, "i") },
        { voterNo: new RegExp(trimmedSearch, "i") },
        { house: new RegExp(trimmedSearch, "i") },
        { holdingNo: new RegExp(trimmedSearch, "i") },
      ];

      // numeric search for serialNo
      if (!isNaN(numSearch)) {
        orArray.push({ serialNo: numSearch });
      }

      query = { $or: orArray };
    }

    const records = await Record.find(query).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const updated = await Record.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
