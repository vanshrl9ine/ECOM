import orderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
const Order=orderModel;
const Product=ProductModel
import ErrorHandler from "../utils/errorHandler.js";
import AsyncHandler from "../middlewares/catchAsyncerror.js";

//create new order
const newOrder = AsyncHandler(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });
  
// get logginuserorder
const getSingleOrder=AsyncHandler(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("order not found with this id",404));
    }
    res.status(200).json({
        success:true,
        order,
    });
});
export {newOrder,getSingleOrder};