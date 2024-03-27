import ErrorHandler from "../utils/errorHandler.js";
import AsyncHandler from "../middlewares/catchAsyncerror.js";

import userModel from "../models/userModel.js";
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
    res.status(201).json({
        success:true,
        user,
    })
})
export default registerUser;