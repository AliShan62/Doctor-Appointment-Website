const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
   getAllDocotrsController,
  bookAppointmentController,
  checkAvailabilityController,
  userAppointmentController,

} = require("../controllers/usersCtrl");


// Here Regiter || Post data
router.post("/register", registerController);

// Here Login || Post data
router.post("/login", loginController);

// Here Authorization || get UserData for response
router.post("/getUserData", authMiddleware, authController)

//for apply-doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController)
//for all notification 
router.post("/get-all-notifications", authMiddleware, getAllNotificationController)

//for all notification 
router.post("/delete-all-notifications", authMiddleware, deleteAllNotificationController)

//for get All doctors
//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware,  bookAppointmentController);

//ckeck-availability of doctor
router.post("/ckeck-availability", authMiddleware,checkAvailabilityController);

//Appointment List of doctor
router.get("/user-appointments", authMiddleware,userAppointmentController);



module.exports = router;
