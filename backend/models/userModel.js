import mongoose from "mongoose";
import validator from "validator";
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"please enter your name"],
    maxLength:[30,"Name cannot exceed 30 chars"],
    minLength:[3,"Name should have more than 3 chars"]

  },
  email:{
    type:String,
    required:[true,"enter email"],
    unique:true,
    validate:[validator.isEmail,"please enter valid email"]
  },
  password:{
    type:String,
    required:[true,"please enter your password"],
    minLength:[8,"password should be greater than 8 chars"],
    select:false//find function wont return

  },
  avatar:{
    
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true

        }
    
  },
  role:{
    type:String,
    default:"user"
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,

});

userModel=mongoose.model("User",userSchema);