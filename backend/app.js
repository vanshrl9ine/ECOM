import express from 'express';

const app=express();
app.use(express.json());
//Route imports
import router from './routes/productRoute.js';
const product=router;
app.use("/api/v1",product);

//home page hello world :)
app.get('/',(req,res)=>{
    res.send("helo world");
})
export default app;