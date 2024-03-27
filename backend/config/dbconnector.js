import mongoose from 'mongoose';
const DBNAME="ecom";
const connectDB=async()=>{
    
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}`,{
            dbName: 'ecom',
            
        })
        console.log(`mongodb connected  db host:${connectionInstance.connection.host}`);
    
    // catch (error) {
    //     console.log("connection error:",error);
    //     process.exit(1);
    // }handled in server js promise rejection handling
}
export default connectDB;