import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  // to store product data in database

  // we will store the uploaded filename in this variable
  let image_filename = `${req.file.filename}`;

  // whenever  we will hit tha api in the body we will send the below details and we will access it in the backend using this function
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// ALL FOOD LIST
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item

const removeFood=async (req,res)=>{
  try {
    // find the food item first
    const food=await foodModel.findById(req.body.id);
    // to delte images
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }

}
export { addFood, listFood,removeFood };
