const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/me", auth, authController.getCurrentUser);
router.put("/user/update/:id", auth, authController.updateName);
router.put("/user/reset-password/:id", auth, authController.resetPassword);

module.exports = router;
