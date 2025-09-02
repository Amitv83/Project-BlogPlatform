import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/post.js";
import cors from "cors";
import { DB_NAME } from "./constants.js";

import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import multer from "multer";
import jwt from "jsonwebtoken";
import fs from "fs";
import { uploadOnCloudinary } from "./models/Cloudinary.js";
import dotenv from "dotenv";
const app = express();

dotenv.config({
    path: `./.env`
});



//related to file uplode>

const uploadMiddleware = multer({ dest: "uploads/" });

const secret = "ojrmskldndfnvjkdzfmL:Jljsjzsfjvn;osfiwepokwpih";
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser());

app.use(express.json());

mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password,
    });
    // {requestData:{username,password}}
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    const accessToken = await userDoc.generateAccessToken();
    const refreshToken = await userDoc.generateRefreshToken();
    userDoc.refreshToken = refreshToken;
    await userDoc.save({ validateBeforeSave: false });

    res
      .status(207)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json(userDoc,"User logged in successfully (❁´◡`❁)");
  } else {
    res.status(400).json("wrong credentials");
  }
});

// logout and create new post
//shown in the page after login not login and register option
app.get("/profile", (req, res) => {
  const { accessToken } = req.cookies;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

/// token hata do
app.post("/logout", (req, res) => {
  
  res.clearCookie("refreshToken")
  .clearCookie("accessToken")
  .json(200,"User logged out successfully");
});

app.post("/post", uploadMiddleware.single("file"), async(req, res) => {
 
  const cover = await uploadOnCloudinary(req.file.path);
  // res.json({ext});
  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: cover.url,
  })


  res.json({
    postDoc
  });
});

app.get("/post", async (req, res) => {
  const postDoc = await Post.find();
  res.json(postDoc);
})

app.get("/post/:id", async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id);
  console.log(postDoc);
  res.json(postDoc);
})

app.listen(4000);
