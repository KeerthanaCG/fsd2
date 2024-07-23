import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// default is login
const loginUser = async (req, res) => {
  const {email,password}=req.body;
  try {
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User Doesn't exist"})
    }
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){
return res.json({success:false,message:"Invalid credentials"})
    }
    const token=createToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // if user is already registered with the email id
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid email id",
      });
    }
    // password length is less than 8 digits

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a strong password",
      });
    }

    // to encrypt the password -hashing

    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt);

    // to create a new user

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    })
    // to save the user in the database

    const user = await newUser.save()
        const token = createToken(user._id)
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export { loginUser, registerUser };
