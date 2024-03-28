import express from 'express';
import {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails} from '../controllers/productController.js';
import isAuthenticatedUser from '../middlewares/auth.js';
const router=express.Router();

router.route("/products").get(isAuthenticatedUser,getAllProducts);

router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

export default router;
