import mongoose from "mongoose";

const connecDB=async()=>{
    try{
        await mongoose.connect(ProcessingInstruction.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    }catch(error){
        console.log("MongoDB Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};
export default connectDB;