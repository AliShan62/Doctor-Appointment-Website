const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  authController,
  applyDoctorController,
} = require("../controllers/usersCtrl");

// Here Regiter || Post data
router.post("/register", registerController);

// Here Login || Post data
router.post("/login", loginController);

// Here Authorization || get UserData for response
router.post("/getUserData", authMiddleware, authController)

//for apply-doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController)

module.exports = router;
