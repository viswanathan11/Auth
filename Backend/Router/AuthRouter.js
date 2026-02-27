import {Router} from "express"
import { loginValidation, signupValidation } from "../Middleware/AuthValdiation.js";
import { login, signUp } from "../Controller/authContoller.js";
// to use the Router we need to initialize ROuter usng ROuter() method it return a mini express js
const router =Router();


router.get("/Products", (req, res) => {
  res.header("content-type:application/json");
  res.send({
    Ronaldo: "100lakh",
    Messi: "199l",
  });
});
//after the signupvalidation is tree then the signup() function is called 
//the signup function will handle (req,res)

//ok this is an middleware chaining
router.post('/signup',signupValidation,signUp);
// exporting the router objects which has the http methods and how it is handeled
export default router;


router.post('/login',loginValidation,login);