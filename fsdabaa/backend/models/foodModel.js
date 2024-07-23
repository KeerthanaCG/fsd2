import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const foodModel=mongoose.models.food || mongoose.model("food",foodSchema)
// if model is already present it will use the first one because every time we run this file the model gets created again to solve this issue 

export default foodModel;