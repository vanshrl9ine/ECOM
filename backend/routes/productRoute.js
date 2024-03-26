import express from 'express';
import {getAllProducts,createProduct} from '../controllers/productController.js';

const router=express.Router();
router.route("/products").get(getAllProducts);
try {
    router.route("/product/new").post(createProduct);
} catch (error) {
    console.log(error);
}


export default router;
