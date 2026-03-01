import jwt from "jsonwebtoken";
import userModel from "../Models/users.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json("User is Already exist, you can login");
    } else {
      //Create a new user;
      const newUser = new userModel({ name, email, password });
      //Encryptin password before storing in database
      newUser.password = await bcrypt.hash(password, 10);
      //Now Save the user Model to Database
      //save() returns promise bcs we need to communicate with db
      //so we dont know how long it wll take
      await newUser.save();
      res.status(201).json({ message: "Sign up Success", success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Login Failed. \n Email or Password is Wrong " });
    }
    //wee neeed to verfy the password
    const isPassword = await bcrypt.compare(password, user.password);
   
 
    if (!isPassword) {
      return res.status(400).json({ message: "Password incorrect" });
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRETE_KEY,
        { expiresIn: "24h" },
      );
      return res.status(200).json({
        message: "Logind Successfully",
        name:user.name,
        email:user.email,
        success: true,
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Integernal Server error",
      success: false,
    });
  }
};

export { signUp, login };
