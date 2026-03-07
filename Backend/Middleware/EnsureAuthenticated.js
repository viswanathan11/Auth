//Authenticated user
//middleware
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  
  //remove Bearer

  //suppose the request does not containt the jwt token

  if (!auth) {
    //401:unAuthorized
    return res.status(401).json({
      message: "JWT Token is Required",
    });
  } else {
    try {
      const token=auth.replace("Bearer ","");
        //No verify the token and expiery and returns the payload
        const decoded=jwt.verify(token,process.env.JWT_SECRETE_KEY);
        
        // Instead of decoding the token again in every route handler, 
        // you store the decoded data on req
        //Now any middleware or route after this 
        // we can simply use req.user.userId or req.user.email without re-verifying
        req.user=decoded;
        next();

    } catch (err) {
        return res.status(403).json({message:"Unauthhorized, JWT token is wrong or expired"})
    }
  }
};

export default ensureAuthenticated;