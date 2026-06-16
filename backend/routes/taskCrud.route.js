const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskCrud.controller");
const verifyUser = require("../middlewares/verifyUser");

router.get("/", verifyUser, getTasks);

router.post("/createTask", verifyUser, createTask);

router.put("/edit/:id", verifyUser, editTask);

router.delete("/delete/:id", verifyUser, deleteTask);

module.exports = router;
