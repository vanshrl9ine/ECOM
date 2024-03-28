import ErrorHandler from "../utils/errorHandler.js";

const errmMiddleware=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal server error";

    //wrong mongodb Id error
    if(err.name=="castError"){
        message=`resource not found.Invalid: ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stacktrace:err.stack
    })
}

export default errmMiddleware;