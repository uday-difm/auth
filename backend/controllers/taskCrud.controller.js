const db = require("../db/db");

const createTask = async (req, res) => {
  const {
    title,
    description,
    assigned_member_1,
    assigned_member_2,
    priority,
    deadline,
  } = req.body;

  if (!title || !description || !assigned_member_1 || !priority || !deadline) {
    return res.status(400).json({
      message:
        "Please include all required fields: title, description, assigned_member_1, priority, deadline",
    });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO tasks (title, description, assigned_member_1, assigned_member_2, priority, deadline) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        assigned_member_1,
        assigned_member_2,
        priority,
        deadline,
      ],
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      assigned_member_1,
      assigned_member_2,
      priority,
      deadline,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * from tasks");
    res.json({ rows });
  } catch (error) {
    console.log("Error:", error);
  }
};

const editTask = async (req, res) => {
  const {
    title,
    description,
    assigned_member_1,
    assigned_member_2,
    priority,
    deadline,
  } = req.body;
  const { id } = req.params;

  if (!title || !description || !assigned_member_1 || !priority || !deadline) {
    return res.status(400).json({
      message:
        "Please include all required fields for update: title, description, assigned_member_1, priority, deadline",
    });
  }

  try {
    const [result] = await db.execute(
      "UPDATE tasks SET title = ?, description = ?, assigned_member_1 = ?, assigned_member_2 = ?, priority = ?, deadline = ? WHERE id = ?",
      [
        title,
        description,
        assigned_member_1,
        assigned_member_2,
        priority,
        deadline,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or no changes made" });
    }

    res.status(200).json({ message: "Task updated successfully", id });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createTask, getTasks, editTask, deleteTask };
