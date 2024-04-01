import express from "express";
import {isAuthenticatedUser,authorizeRoles} from '../middlewares/auth.js';
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";

const orderRouter=express.Router();
orderRouter.route("/order/new").post(isAuthenticatedUser,newOrder);
orderRouter.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
orderRouter.route("/orders/me").get(isAuthenticatedUser,myOrders);
orderRouter
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

orderRouter
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);
export default orderRouter;