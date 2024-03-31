import express from 'express';
import {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview} from '../controllers/productController.js';
import {isAuthenticatedUser,authorizeRoles} from '../middlewares/auth.js';
const router=express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);
export default router;
