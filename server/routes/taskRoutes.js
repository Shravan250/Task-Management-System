const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const taskController = require("../controllers/taskController");

router.post("/", auth, taskController.addTask);
router.get("/", auth, taskController.getTasks);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);
router.put("/:id/toggle", taskController.toggleTaskCompletion);

module.exports = router;
