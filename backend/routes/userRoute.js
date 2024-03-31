import express from "express";
import {registerUser,loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile} from "../controllers/userController.js";

import { isAuthenticatedUser,authorizeRoles } from "../middlewares/auth.js";
const userRouter=express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/password/reset/:token").put(resetPassword);
userRouter.route("/me").get(isAuthenticatedUser,getUserDetails);
userRouter.route("/password/update").put(isAuthenticatedUser,updatePassword);
userRouter.route("/me/update").put(isAuthenticatedUser,updateProfile);
export default  userRouter;