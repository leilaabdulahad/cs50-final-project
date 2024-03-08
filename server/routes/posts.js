import express from "express";
import { getFeedPosts, getUserPosts, likePost, createComment, deleteComment, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Route to get all posts for the feed
router.get("/", verifyToken, getFeedPosts)

// Route to get all posts for a specific user
router.get("/:userId/posts", verifyToken, getUserPosts);

// Route to like a post
router.patch("/:id/like", verifyToken, likePost)

// Route to create a comment
router.post("/:id/comments", verifyToken, createComment);

// Route to delete a comment
router.delete("/:postId/comments/:commentId", verifyToken, deleteComment);

// Route to delete a post
router.delete("/:id", verifyToken, deletePost);

export default router;