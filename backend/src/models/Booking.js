import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
{
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        required:true,
    },
    tenant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    }
},
{
    timestamps:true,
}
);

export default mongoose.model("Booking", bookingSchema);