import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJwt, getCurrentUser);

export default router;
