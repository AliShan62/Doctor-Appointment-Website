const UserModel=require('../models/userModle');  // Adjust the path as needed
// Adjust the path as needed
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel=require("../models/doctorModle");
// Here is the register callback function
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
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await UserModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};




module.exports = { registerController, loginController, authController,applyDoctorController };
