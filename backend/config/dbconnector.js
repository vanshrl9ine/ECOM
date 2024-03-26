import mongoose from 'mongoose';
const DBNAME="ecom";
const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}`,{
            dbName: 'ecom',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`mongodb connected  db host:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("connection error:",error);
        process.exit(1);
    }
}
export default connectDB;