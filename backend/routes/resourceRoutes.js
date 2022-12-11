// const express = require("express");
// const router = express.Router();
const Router = require("express-promise-router");
const router = new Router();

const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getResource,
} = require("../controllers/resourceControllers");

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getResources).post(protect, createResource);
router
  .route("/:id")
  .put(protect, updateResource)
  .delete(protect, deleteResource)
  .get(getResource);

module.exports = router;
