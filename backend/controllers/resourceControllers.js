const db = require("../db/index");

// @desc    Get resources
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM resources ORDER BY id ASC");

  res.status(200).json(rows);
};

// @desc    Get resource
// @route   GET /api/resources/:id
// @access  Public
const getResource = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM resources WHERE id = $1", [
    id,
  ]);

  if (rows.length === 0) {
    res.status(400);
    throw new Error("Resource not found");
  }

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
  const { name, email } = req.user;

  let resource = await db.query("SELECT * FROM resources WHERE id = $1", [id]);

  resource = resource.rows;

  if (resource.length === 0) {
    res.status(400);
    throw new Error("Resource not found");
  }

  let userExists = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  userExists = userExists.rows;

  if (userExists.length === 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (resource.user_id !== userExists.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

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
const deleteResource = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.user;

  let resource = await db.query("SELECT * FROM resources WHERE id = $1", [id]);

  resource = resource.rows;

  if (resource.length === 0) {
    res.status(400);
    throw new Error("Resource not found");
  }

  let userExists = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  userExists = userExists.rows;

  if (userExists.length === 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (resource.user_id !== userExists.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const queryString = `
    DELETE FROM resources
    WHERE id = $1
    RETURNING id
  `;

  const values = [id];

  const { rows } = await db.query(queryString, values);

  res.status(200).json(rows[0]);
};

module.exports = {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getResource,
};
