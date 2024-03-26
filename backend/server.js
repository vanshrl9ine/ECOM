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

///handling uncaught ecxeption
process.on("uncaughtException",(err)=>{
console.log(err.message);
console.log("shutting down server due to uncaughtException");
process.exit(1);
})


const server=app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
})

//Unhandled promise rejection
process.on("unhandledRejection",(err)=>{
 console.log(err.message);
 console.log("shutting down server due to unhandled promise rejection");
 server.close(()=>{
    process.exit(1);
 })
})