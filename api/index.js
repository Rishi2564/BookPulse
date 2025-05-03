require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

async function connectMongo(){
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  }
  catch(error){
    console.log(error);
    process.exit(1);
  }
}
connectMongo();
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });
});
