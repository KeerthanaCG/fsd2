import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
// port number where server will be running
const port = process.env.PORT || 4000;

// middleware

// whenever we get request from frontend to backend that will be passes uding this json
app.use(express.json());
app.use(cors()); //we can access backend from any front

//DB CONNECTION
connectDB();

// API endpoints

app.use("/api/food",foodRouter);
// to enable the images to be seen in the database weare mounting the uploads folder in the images endpoint
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);




// get -we can request data from the server
app.get("/", (req, res) => {
  res.send("API Working...");
});
// to run express server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
});

// mongodb+srv://keerthanagirishchn:8867706377@cluster0.44hogja.mongodb.net/?
