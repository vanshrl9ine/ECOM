import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        min: [0, "Price cannot be negative"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true

            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter the product category"],

    },
    Stock:{
        type:Number,
        min: [0, "Stock cannot be negative"],
        default:1
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,  
              },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true,  
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const ProductModel=mongoose.model("Product",productSchema);

export default ProductModel;