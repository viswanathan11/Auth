const express = require("express");
const app = express();
const cors = require("cors");
//dotenv module reads the env file and add those to the process.env of nodejs
require("dotenv").config();
require("./Models/db");

// imports the Router class Objects which has defined the http methods
const AuthRouter = require("./Router.js/AuthRouter");
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
app.use("/",AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is Live On: http://localhost:${PORT}`);
});
