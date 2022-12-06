const db = require("../db/index");

// @desc    Get resource
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM resources");
  console.log(rows);
  res.status(200).json({ message: "Get resources" });
};

// @desc    create resource
// @route   POST /api/resources
// @access  Public
const createResource = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ message: "Create resource" });
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Public
const updateResource = (req, res) => {
  res.status(200).json({ message: `Update resource ${req.params.id}` });
};

// @desc    Delete resource
// @route   DELETE /api/resources
// @access  Public
const deleteResource = (req, res) => {
  res.status(200).json({ message: `Delete resource ${req.params.id}` });
};

module.exports = {
  getResources,
  createResource,
  updateResource,
  deleteResource,
};
