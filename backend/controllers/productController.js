import ProductModel from "../models/productModel.js";

const Product=ProductModel;
//create a product
const createProduct=async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product

    })
}

const getAllProducts=(req,res)=>{
    res.status(200).json({message:"route is woring"})
}
export {getAllProducts,createProduct};