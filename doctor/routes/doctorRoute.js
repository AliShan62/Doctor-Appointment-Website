const express=require("express")
const authMiddleware = require("../middlewares/authMiddleware");
const 
{
    getdoctorInfoCtrl,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController
} = require("../controllers/doctorCtrl");
const router=express.Router()




// get Single Doctor Information 

router.post("/getSingleDoctorInfo",authMiddleware,getdoctorInfoCtrl )
// for update doctor profile 

router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET Appointments
router.get("/doctor-appointments",authMiddleware,doctorAppointmentsController);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);
module.exports=router