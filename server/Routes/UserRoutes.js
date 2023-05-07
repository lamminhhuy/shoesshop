import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRouter.put(
  "/disable",

  asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (user) {
      user.isDisable = true;
      const updatedUser = await user.save();
      res.json (updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRouter.put(
  "/enable",

  asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (user) {
      user.isDisable = false;
      const updatedUser = await user.save();
      res.json (updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
userRouter.post(
  "/isDisable",
  asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (user) {
     if (user.isDisable == true)
     {
      res.json ({message:"true"});
     }else{
      res.json ({message:"false"});
     }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.post(
  "/all",
  
  asyncHandler(async (req, res) => {
    const {isDisable} = req.body ? req.body : {};
    const users = await User.find(!isDisable ? {}: {isDisable:isDisable});
    res.json(users);
  })
);

export default userRouter;
