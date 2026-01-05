const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks
} = require("../controllers/task.controller");

router.post("/tasks", createTask);
router.get("/tasks", getTasks);

module.exports = router;
