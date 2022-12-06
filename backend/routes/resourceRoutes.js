const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get resources" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Create resource" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Update resource ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete resource ${req.params.id}` });
});

module.exports = router;
