const db = require("../db/index");

// @desc    Get categories
// @route   GET /api/resources
// @access  Public
const getCategories = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM categories ORDER BY id ASC");

  res.status(200).json(rows);
};

// @desc    create category
// @route   POST /api/resources
// @access  Public
const createCategory = async (req, res) => {
  const { category } = req.body;

  const queryString = `
    INSERT INTO categories (name)
    VALUES($1)
    RETURNING *
  `;

  const values = [category];

  const { rows } = await db.query(queryString, values);

  res.status(200).json(rows[0]);
};

module.exports = {
  getCategories,
  createCategory,
};
