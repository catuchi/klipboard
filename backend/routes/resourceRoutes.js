const express = require("express");
const router = express.Router();

const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourceControllers");

router.route("/").get(getResources).post(createResource);
router.route("/:id").put(updateResource).delete(deleteResource);

module.exports = router;
