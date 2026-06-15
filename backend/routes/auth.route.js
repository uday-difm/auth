const express = require("express");
const {
  login,
  logout,
  me,
  register,
} = require("../controllers/auth.controller");
const verifyUser = require("../middlewares/verifyUser");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyUser, me);
router.post("/register", register);

module.exports = router;
