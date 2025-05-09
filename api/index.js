require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/User.js");
const Place= require("./models/Place.js")
const imageDownloader = require("image-downloader");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer= require("multer")
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "gdhsjdvedhwjjdbdehewj";
const fs=require("fs")

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
    app.listen(4000);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
connectMongo();
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    return res.status(404).json({ error: "User not found" });
  }
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;

  if (!link || typeof link !== "string") {
    return res.status(400).json({ error: "Invalid or missing image link" });
  }

  try {
    const ext = path.extname(new URL(link).pathname).split("?")[0] || ".jpg";
    const newName = "photo" + Date.now() + ext;

    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });

    res.json(newName);
  } catch (error) {
    console.error("Image download failed:", error.message);
    res.status(400).json({ error: "Image download failed. Check the link." });
  }
});
const photosMiddleware= multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos',100) ,(req,res)=>{
  const uploadedFiles=[];
  for(let i=0;i<req.files.length;i++){
     const {path, originalname}=req.files[i];
     const parts=originalname.split('.');
     const ext=parts[parts.length-1];
     const newPath=path+'.'+ext;
     fs.renameSync(path,newPath);
     uploadedFiles.push(newPath.replace('uploads\\',''));
  }
  res.json(uploadedFiles);

});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    try {
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });

      res.status(200).json(placeDoc);
    } catch (e) {
      res.status(500).json({ error: 'Could not create place', details: e.message });
    }
  });
});
