import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password)
    throw new ApiError(400, "All fields are required");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  const user = await User.create({ email, fullName, password });
  const token = user.generateJWTToken();
  res
    .status(201)
    .json(new ApiResponse(201, token, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "All fields are required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User not found");

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid password");

  const token = user.generateJWTToken();
  res
    .status(200)
    .json(new ApiResponse(200, token, "User logged in successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export { registerUser, loginUser, getCurrentUser };
