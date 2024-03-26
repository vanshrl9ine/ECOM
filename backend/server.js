import app from "./app.js";
import dotenv from "dotenv"
dotenv.config(
    {
        path:"backend/config/config.env"
    }
)

//DBconnect
import connectDB from "./config/dbconnector.js";
connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
})