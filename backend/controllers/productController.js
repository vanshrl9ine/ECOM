import ProductModel from "../models/productModel.js";

const Product=ProductModel;
//create a product

//createproduct-admin
const createProduct=async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product

    })
}

//update product--admin
const updateProduct=async(req,res,next)=>{
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
}
//delete project
const deleteProduct=async(req,res,next)=>{
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
}

const getAllProducts=async(req,res)=>{
    const products=await Product.find();
    res.status(200).json({
        success:true,
        products
    
    }
    )
}


export {getAllProducts,createProduct,updateProduct,deleteProduct};