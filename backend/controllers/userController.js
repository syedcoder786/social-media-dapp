const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Login new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, address } = req.body;

  console.log(name);

  if (!name || !address) {
    res.status(400).json({message:"Please add all fields"});
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ address });

  if (userExists) {
    //Login user here
    return res.json({
        _id: userExists.id,
        name: userExists.name,
        address: userExists.address,
        token: generateToken(userExists._id),
      });
  }

  // Create user
  const user = await User.create({
    name,
    address,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { address } = req.body;

  console.log(address)
  
  if (!address) {
    res.status(400).json({message:"Please add all fields"});
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ address });

  if (userExists) {
    //Login user here
    return res.json({
        _id: userExists.id,
        name: userExists.name,
        address: userExists.address,
        token: generateToken(userExists._id),
      });
  }

  res.status(400).json({message:"Not Registered. Please Sign Up"})

})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "secretKey", {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
