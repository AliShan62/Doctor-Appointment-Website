const express=require("express")

const router =express.Router()
const authMiddleware = require("../middlewares/authMiddleware");

const { 
    getAllDoctorsController,
     getAllUsersController, 
     changeAccountStatusController,
    }
      = require("../controllers/adminCtrl");

//here i am getting records of all the doctors
router.get("/getDoctors",authMiddleware,getAllDoctorsController)

//here i am getting records of all the users
router.get("/getUsers",authMiddleware,getAllUsersController)

// //here route for the status of doctor
router.post("/changeAccountStatus",authMiddleware,changeAccountStatusController);



module.exports =router