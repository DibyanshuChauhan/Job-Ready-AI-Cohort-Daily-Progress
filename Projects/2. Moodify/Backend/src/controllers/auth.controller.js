const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      username: newUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    newUser: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");

  if (!user) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const logoutController = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(200).json({
    message: "User logged out successfully",
  });
};

const getMeController = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
