const db = require("../db/index");

// @desc    Get resource
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM resources");
  console.log(rows);
  res.status(200).json({ message: "Get resources" });
};

// @desc    Get resource
// @route   GET /api/resources/:id
// @access  Public
const getResource = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM resources WHERE id = $1", [
    id,
  ]);
  // console.log(rows);
  res.status(200).json(rows[0]);
};

// @desc    create resource
// @route   POST /api/resources
// @access  Public
const createResource = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.image) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  const { title, description, image, category_id, user_id } = req.body;

  const queryString = `
    INSERT INTO resources (title, description, image, category_id, user_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    title,
    description,
    image,
    parseInt(category_id),
    parseInt(user_id),
  ];

  const { rows } = await db.query(queryString, values);

  res.status(200).json(rows[0]);
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Public
const updateResource = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category_id, user_id } = req.body;
  const queryString = `
    UPDATE resources
    SET description = $1
    WHERE id = $2
    RETURNING *
  `;

  const values = [
    "Check out this easy way to convert your number in JS to string https://www.w3schools.com/jsref/jsref_tostring_number.asp",
    id,
  ];

  const { rows } = await db.query(queryString, values);

  res.status(200).json(rows[0]);
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
  getResource,
};
