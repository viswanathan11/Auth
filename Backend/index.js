const express = require("express");
const app = express();
//dotenv module reads the env file and add those to the process.env of nodejs
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Live On: http://localhost:${PORT}`);
});
