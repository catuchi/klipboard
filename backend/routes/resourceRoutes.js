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

router.route("/").get(getResources).post(createResource);
router
  .route("/:id")
  .put(updateResource)
  .delete(deleteResource)
  .get(getResource);

module.exports = router;
