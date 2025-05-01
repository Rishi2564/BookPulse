const express = require("express");
const cors=require("cors");
const  mongoose  = require("mongoose");
const app = express();
app.use(express.json());

//BIGRjafO5bPhOTmm
//mongodb+srv://rishabhpradhan2005:BIGRjafO5bPhOTmm@cluster0.a4fk3dg.mongodb.net/
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173",
}));
mongoose.connect('mongodb+srv://rishabhpradhan2005:BIGRjafO5bPhOTmm@cluster0.a4fk3dg.mongodb.net/')
app.get("/test", (req, res) => {
  res.json("test ok");
});
app.post("/register",(req,res)=>{
    const{name,email,password}= req.body;
    res.json({name,email,password});
})
app.listen(4000);
