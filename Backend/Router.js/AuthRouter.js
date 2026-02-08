const router = require("express").Router();

router.get("/Products", (req, res) => {
  res.header("content-type:application/json");
  res.send({
    Ronaldo: "100lakh",
    Messi: "199l",
  });
});
router.post("/login", (req, res) => {
  console.log("login sucessfull");
  res.send("login sucessfull");
});

router.post("/signup", (req, res) => {
  console.log("signup sucessfull");
  res.send("signup sucessfull");
});

// exporting the router objects which has the http methods and how it is handeled
module.exports = router;
