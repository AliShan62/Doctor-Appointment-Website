const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please Enter Your Correct Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Correct Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Correct Password"],
  },
  isAdmin:{
     type:Boolean,
     default:false,
  },
  isDoctor:{
     type:Boolean,
     default:false,
  },
 notifcation:{
    type: Array,
    default: [],
  },
 seennotification:{
     type:Array,
     default:[],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
