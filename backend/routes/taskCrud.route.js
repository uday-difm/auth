const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskCrud.controller");
router.get("/", getTasks);

router.post("/createTask", createTask);

router.put("/edit/:id", editTask);

router.delete("/delete/:id", deleteTask);

module.exports = router;
