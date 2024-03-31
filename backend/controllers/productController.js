import ProductModel from "../models/productModel.js";

//error handling middlewares
import ErrorHandler from "../utils/errorHandler.js";
import AsyncHandler from "../middlewares/catchAsyncerror.js";
import ApiFeatures from "../utils/apiFeatures.js";


const Product=ProductModel;
//create a product

//createproduct-admin
const createProduct=AsyncHandler(async(req,res,next)=>{
    req.body.user=req.user.id
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
//delete product
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
    
    const resultPerPage=5;
    const productCount=await Product.countDocuments();

    const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
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
//create new review and update
const createProductReview=AsyncHandler(async (req,res,next)=>{
    const {rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product=await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
    if(isReviewed){
       product.reviews.forEach((rev)=>{
        if(rev.user.toString()===req.user._id.toString()){
            rev.rating=rating,
            rev.comment=comment
        };
        
       });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let totalRatings = 0;
    product.reviews.forEach(rev => {
        totalRatings += rev.rating;
    });
    product.ratings = totalRatings / product.reviews.length;
    
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true
    })
});
const getAllReviews=AsyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("product doesnt exist",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
});
const deleteReview=AsyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("product doesnt exist"));

    }
    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());

    let totalRatings = 0;
    reviews.forEach(rev => {
        totalRatings += rev.rating;
    });
    
    const ratings=totalRatings / reviews.length;
    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        }
    )
    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
});
export {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails,createProductReview,getAllReviews,deleteReview};