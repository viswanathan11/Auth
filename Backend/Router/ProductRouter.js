import { Router } from "express";
import ensureAuthenticated from "../Middleware/EnsureAuthenticated.js";
import userModel from "../Models/users.js";
const router = Router();


router.get("/",ensureAuthenticated,async (req, res) => {

  const user=await userModel.findOne(req.email)
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