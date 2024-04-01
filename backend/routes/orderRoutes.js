import express from "express";
import {isAuthenticatedUser,authorizeRoles} from '../middlewares/auth.js';
import { newOrder } from "../controllers/orderController.js";

const orderRouter=express.Router();
orderRouter.route("/order/new").post(isAuthenticatedUser,newOrder);
export default orderRouter;