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

router.use(verifyJwt);

router.post("/", createPost);
router.get("/", getUserPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
