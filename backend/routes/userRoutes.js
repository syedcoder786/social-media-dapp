const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser
} = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/", registerUser);

module.exports = router;
