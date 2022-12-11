const Router = require("express-promise-router");
const router = new Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryControllers");

router.route("/").get(getCategories).post(protect, createCategory);

module.exports = router;
