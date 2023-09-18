const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    require:true
  },
  doctorId: {
    type: String,
    required: true,
  },
  doctorInfo: {
    type: String,
    required:true,
  },
  userInfo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  time: {
    type: String, // This defines an array of strings
    required: true,
  },
}, { timestamps: true });

const appointmentModel = mongoose.model("appointments", appointmentSchema);
module.exports = appointmentModel;
