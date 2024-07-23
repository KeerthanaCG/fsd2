import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://keerthanagirishchn:8867706377@cluster0.44hogja.mongodb.net/Food-Delivery').then(()=>console.log("Db connected"));
}
// using export we can access this function in server.js file