import express from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", verifyJwt, createPost);
router.get("/", verifyJwt, getUserPosts);
router.get("/:id", verifyJwt, getPostById);
router.put("/:id", verifyJwt, updatePost);
router.delete("/:id", verifyJwt, deletePost);

export default router;
