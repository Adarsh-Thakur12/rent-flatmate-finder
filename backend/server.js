import dotnet from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db";
dotenv.config();

const PORT=process.env.PORT||5000;

const startServer = async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server running on the port ${PORT}`);
        });
    }catch(error){
        console.error("Server Failed to start");
    }
};
startServer();