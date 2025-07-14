import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/posts.model.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content)
    throw new ApiError(400, "Title and content are required");

  const post = await Post.create({
    title,
    content,
    tags: tags || [],
    user: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
});

const getUserPosts = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  const posts = await Post.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPosts = await Post.countDocuments({ user: req.user._id });
  const totalPages = Math.ceil(totalPosts / limit);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        posts,
        totalPosts,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
      "Posts fetched successfully"
    )
  );
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");
  res.status(200).json(new ApiResponse(200, post, "Post fetched successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title || !content)
    throw new ApiError(400, "Title and content are required");

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
      tags: tags || [],
    },
    { new: true }
  );
  if (!post) throw new ApiError(404, "Post not found");
  res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");
  res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});

export { createPost, getUserPosts, getPostById, updatePost, deletePost };
