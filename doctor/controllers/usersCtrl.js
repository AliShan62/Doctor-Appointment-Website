const UserModel=require('../models/userModle');  // Adjust the path as needed
// Adjust the path as needed
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel=require("../models/doctorModle");
//const userModel= require('../models/userModle');
const appointmentModel=require("../models/appointmentModel")
// Here is the register callback function
const moment = require('moment');
const registerController = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).send({
        message: "Already Registered User!",
        success: false,
      });
    }

    // Here I am bcrypting the password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;

    // Creating a new user for registration
    const newUser = new UserModel(req.body);
    await newUser.save();

    res.status(200).send({
      message: "User Registered Successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(200).send({
      success: false,
      message: `Error In Register Controller ${error.message}`,
    });
  }
};

// Here is the Login callback function
const loginController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email:req.body.email });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    //here i am generating token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).send({
      message: "User Login Successfully!",
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(200).send({
      success: false,
      message: `Error in Login Cotroller ${error.message}`,
    });
  }
};

const authController = async (req, res) => {

  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.password=undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data:user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await UserModel.findOne({ isAdmin: true });

    // Make sure adminUser.notifcation is an array (initialize if undefined)
    adminUser.notifcation = adminUser.notifcation || [];

    adminUser.notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs", // Check the path
      },
    });
    await UserModel.findByIdAndUpdate(adminUser._id, { notifcation: adminUser.notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    const  seennotification= user.seennotification;
    const  notifcation = user.notifcation;
     seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification= notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All Notification Marked As Read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Notification",
      success: false,
      error,
    });
  }
};

const deleteAllNotificationController=async(req,res)=>{
  try {
       const user=await UserModel.findById({ _id: req.body.userId })
        user.notifcation=[];
        user.seennotification=[];
        const updatedUser=await user.save();
         updatedUser.password=undefined;
         res.status(200).send({
           success:true,
           meaage:"Delete All Notifications",
           updatedUser,
         })
  } catch (error) {
     console.log(error)
     res.status(500).send({
      success:false,
      message:"Error in Delete All Notifications",
      error,

     })
  }

}

const   getAllDocotrsController= async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";

    // Save the complete doctor information in the appointment document
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await UserModel.findOne({ _id: req.body.doctorInfo.userId });
    user. notifcation.push({
      type: "New-appointment-request",
      message: `A New Appointment Request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

const checkAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YY').toISOString();
    const fromtime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
    const totime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
    const doctorId = req.body.doctorId;

    const appointments = await appointmentModel.find({
      doctorId: doctorId,
      date: date,
      time: {
        $gte: fromtime,
        $lte: totime,
      },
    });

    if( appointments.length>0){
      return  res.status(500).send({
      message: "Doctor Not Available At This Time Slot !",
       success: true,
    });
    }else{
        res.status(200).send({
       success: true,
       message: "WELLCome! Doctor Available At This Time Slot",
    });
    }

   
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Checking Doctor Availability",
    });
  }
};


const userAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "User Appointment Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting The list of Appointments",
      error,
    });
  }
};







module.exports = {
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
};
