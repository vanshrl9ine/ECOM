import ErrorHandler from "../utils/errorHandler.js";
import AsyncHandler from "../middlewares/catchAsyncerror.js";

import userModel from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
const User=userModel;
//register a user
const registerUser=AsyncHandler(async (req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicurl"
        }
    });

    sendToken(user,201,res);
})
//login user
const loginUser=AsyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched=user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email and password",401));
    }
    sendToken(user,200,res);
})
//logout user
const logoutUser=AsyncHandler(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"logged out succesfully"
    })
})

export {registerUser,loginUser,logoutUser};