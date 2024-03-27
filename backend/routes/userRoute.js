import express from "express";
import registerUser from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.route("/register").post(registerUser);

export default  userRouter;