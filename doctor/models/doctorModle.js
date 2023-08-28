const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, 'Kindly Enter Your First Name'], // Changed 'require' to 'required'
  },
  lastName: {
    type: String,
    required: [true, 'Kindly Enter Your Last Name'], // Changed 'require' to 'required'
  },
  phone: {
    type: String,
    required: [true, 'Kindly Enter Your Phone'], // Changed 'require' to 'required'
  },
  email: {
    type: String,
    required: [true, 'Kindly Enter Your Email'], // Changed 'require' to 'required'
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, 'Kindly Enter Your Address'], // Changed 'require' to 'required'
  },
  specialization: {
    type: String,
    required: [true, 'Kindly Enter Your Specialization'], // Changed 'require' to 'required'
  },
  experience: {
    type: String,
    required: [true, 'Kindly Enter Your Experience'], // Changed 'require' to 'required'
  },
  feePerConsultation: {
    type: String,
    required: [true, 'Kindly Enter Your Fee'], // Changed 'require' to 'required'
  },
  status: {
    type: String,
    default: 'pending',
  },
   timing: {
        time: {
            type: String, // or whatever type is appropriate
           
        },
    },
}, { timestamps: true }); // Changed 'timesStamps' to 'timestamps'

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;
