const Router = require("express-promise-router");
const router = new Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

module.exports = router;
