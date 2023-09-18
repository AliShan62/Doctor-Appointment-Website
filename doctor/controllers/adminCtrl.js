 const UserModel=require('../models/userModle');
 const doctorModel=require("../models/doctorModle");


 const getAllUsersController=async(req,res)=>{
    try {
    const users =await UserModel.find({})
      res.status(200).send({
         success:true,
         message:"Users Get Successfully!",
         data:users,
     })
    } catch (error) {
      console.log(error),
     res.status(500).send({
      success:false,
      message:"Error Getting the Users",
      error,
     })  
    }
 }

 const getAllDoctorsController=async(req,res)=>{
  try {
   const doctors=await doctorModel.find({})
     res.status(200).send({
         success:true,
         message:"Doctors Get Successfully!",
         data:doctors,
     })
 } catch (error) {
     console.log(error),
     res.status(500).send({
      success:false,
      message:"Error Getting the Doctors",
      error,
     })

 }
 }


const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await UserModel.findOne({ _id: doctor.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor =status=== "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

 module.exports={
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
 }