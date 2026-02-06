import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).aelect("-password");
  res.status(200).json({
    success: true,
    users,
  });
});
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, addresses } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
    addresses: addresses || [],
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      addresses: user.addresses,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByid(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // if (user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
  // }
  user.name = req.body.name || user.name;
  if (req.body.password) {
    user.password = req.body.password;
  }
  if (req.body.role) {
    user.role = req.body.role;
  }
  user.addresses = req.body.addresses || user.addresses;
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    role: updatedUser.role,
    addresses: updateUser.addresses,
  });
});
export { getUsers, createUser, getUserById, updateUser };
