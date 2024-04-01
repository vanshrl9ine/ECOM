import express from "express";
import {isAuthenticatedUser,authorizeRoles} from '../middlewares/auth.js';
import { getSingleOrder, myOrders, newOrder } from "../controllers/orderController.js";

const orderRouter=express.Router();
orderRouter.route("/order/new").post(isAuthenticatedUser,newOrder);
orderRouter.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
orderRouter.route("/orders/me").get(isAuthenticatedUser,myOrders);
export default orderRouter;