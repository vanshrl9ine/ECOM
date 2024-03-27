import ProductModel from "../models/productModel.js";

//error handling middlewares
import ErrorHandler from "../utils/errorHandler.js";
import AsyncHandler from "../middlewares/catchAsyncerror.js";
import ApiFeatures from "../utils/apiFeatures.js";


const Product=ProductModel;
//create a product

//createproduct-admin
const createProduct=AsyncHandler(async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json(
        {
        success:true,
        product

    }
    )
}
);

//update product--admin
const updateProduct=AsyncHandler(async(req,res,next)=>{
    let product=Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })
});
//delete project
const deleteProduct=AsyncHandler(async(req,res,next)=>{
 const product=await Product.findById(req.params.id);
 if(!product){
    return res.status(500).json({
        success:false,
        message:"product not found"
    })
 }
 await product.deleteOne();
 res.status(200).json({
    success:true,
    message:"product deleted succesfuly",
    product

 })
});



const getAllProducts=AsyncHandler(async(req,res)=>{
    const apiFeature=new ApiFeatures(Product.find(),req.query).search()
    const products=await apiFeature.query;
    res.status(200).json({
        success:true,
        products
    
    }
    )
});
//get product details for a single project


const getProductDetails=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
 if(!product){
    return next(new ErrorHandler("product not found",404));
 }
 res.status(200).json({
    success:true,
    message:"product found",
    product

 })
} 


export {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails};