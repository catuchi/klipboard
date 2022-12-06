// @desc    Get resource
// @route   GET /api/resources
// @access  Public
const getResources = (req, res) => {
  res.status(200).json({ message: "Get resources" });
};

// @desc    create resource
// @route   POST /api/resources
// @access  Public
const createResource = (req, res) => {
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
