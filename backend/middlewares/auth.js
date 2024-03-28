import ErrorHandler from "../utils/errorHandler.js";
import AsyncHandler from "./catchAsyncerror.js";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";


import userModel from "../models/userModel.js";
const User=userModel;
const isAuthenticatedUser=AsyncHandler(async(req,res,next)=>{
const {token}=req.cookies;


if(!token){
    return next(new ErrorHandler("Please Log in to access this resource",401));
}
const decodeData=jsonwebtoken.verify(token,process.env.JWT_SECRET);
req.user=await User.findById(decodeData.id);

next();

});
export default isAuthenticatedUser;