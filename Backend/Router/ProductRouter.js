import { Router } from "express";
import ensureAuthenticated from "../Middleware/EnsureAuthenticated.js";
import userModel from "../Models/users.js";
const router = Router();

console.log("---- PRODUCT ROUTER FILE LOADED ----");

router.get("/",ensureAuthenticated,async (req, res) => {
  console.log("PayLoad : ",req.user);
  const user=await userModel.findOne({email: req.user.email})

  res.status(200).json([
    user.name,
    {
      name: "Nike",
      price: 1000,
    },
    {
      name: "tv",
      price: 2000,
    },
  ]);
});


export default router;