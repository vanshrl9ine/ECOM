import ErrorHandler from "../utils/errorHandler.js";
import AsyncHandler from "../middlewares/catchAsyncerror.js";
import sendEmail from "../utils/sendEmail.js";
import userModel from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import crypto from 'crypto';

const User = userModel;
//register a user
const registerUser = AsyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicurl"
        }
    });

    sendToken(user, 201, res);
});
//login user
const loginUser = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
   
    //checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid email and password", 401));
    }
    sendToken(user, 200, res);
});
//logout user

const logoutUser = AsyncHandler(async (req, res, next) => {
    // Check if there's already a token present in the request cookies
    const token = req.cookies.token;

    // If there's no token, it means the user is already logged out
    if (!token) {
        return res.status(200).json({
            success: true,
            message: "User is already logged out.",
        });
    }

    // If there's a token, remove it from the cookies
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    // Send response indicating successful logout
    res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    });
});


//forgot password
const forgotPassword = AsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler("user not found", 404));

    //get reset pass token
    const resetToken = user.getResetPasswordToken();

    await user.save({ valdateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;


    const message = `your password reset token is :- \n \n ${resetPasswordUrl} \n \n If you have not requested this email then please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `ecommerce password recovery`,
            message
        });
        res.status(200).json({
            success: true,
            message: `email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});
//reset password
const resetPassword=AsyncHandler(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now() },
    })
    if(!user){
        return next(new ErrorHandler("reset password token is not valid ha been expired",400));
    }
    if(req.body.password!=req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);

})

//get active users
// Assuming you have a database or cache to store token information



export { registerUser, loginUser, logoutUser, forgotPassword,resetPassword};