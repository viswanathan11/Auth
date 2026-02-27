import express from "express"
import "./db.js"
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./Router/AuthRouter.js"
const app = express();

//dotenv module reads the env file and add those to the process.env of nodejs
dotenv.config();

// imports the Router class Objects which has defined the http methods
const PORT = process.env.PORT;

//middleware//

//when the server get request from client it need to be converted into json to be used
//  (for example post , patch,update( which contains body))
app.use(express.json());

// server : 8080
//clint:3000
// so we need cros origin comunication between client and server
app.use(cors());

//router middleware
app.use("/api",AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is Live On: http://localhost:${PORT}`);
});
