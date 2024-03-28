import express from 'express';
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());
app.use(cookieParser());

//Route imports
import router from './routes/productRoute.js';
const product=router;
import userRouter from './routes/userRoute.js';
const user=userRouter;

app.use("/api/v1",product);
app.use("/api/v1",user);
//middlewares

//error handler middleware
import errorMiddleware from "./middlewares/error.js"
const errMiddlewarefunc=errorMiddleware;
app.use(errMiddlewarefunc);

//home page hello world :)


export default app;