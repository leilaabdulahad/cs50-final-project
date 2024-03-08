import mongoose from "mongoose"
import Post from "../models/Post.js"
import User from "../models/User.js"

const findUserById = async (userId) => {
  return await User.findById(userId);
};

const findPostById = async (postId) => {
  return await Post.findById(postId);
};

const handleError = (res, err) => {
  res.status(500).json({ message: err.message });
};

// Create post 
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await findUserById(userId)
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
    })
    await newPost.save()

    const post = await Post.find()
    res.status(201).json(post)
  } catch (err) {
    handleError(res, err)
  }
};

// Get all posts
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (err) {
    handleError(res, err)
  }
};

// Get all posts for a specific user, retrieves posts by userId
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId })
    res.status(200).json(post)
  } catch (err) {
    handleError(res, err)
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    
    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post id' })
    }

    const post = await findPostById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (err) {
    handleError(res, err)
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findByIdAndDelete(id)
    if (!post) {
      return res.status(404).json({ message: `Cannot find post with id ${id}` })
    }
    res.status(200).json(post)
  } catch (err) {
    handleError(res, err)
  }
};

// Create a comment
export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: `Cannot find user with id ${userId}` })
    }

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: `Cannot find post with id ${id}` })
    }

    const timestamp = new Date().toISOString()

    post.comments.push({ text, userId, timestamp })

    await post.save()

    res.status(201).json(post)
  } catch (err) {
    handleError(res, err)
  }
};


// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params
    const post = await findPostById(postId)

    // Find the comment in the post's comments array and remove it
    const commentIndex = post.comments.findIndex((comment) => comment.id === commentId)
    if (commentIndex === -1) {
      return res.status(404).json({ message: `Cannot find comment with id ${commentId}` })
    }
    post.comments.splice(commentIndex, 1);

    // Save the post with the comment removed
    await post.save();
    res.status(200).json(post)
  } catch (err) {
    handleError(res, err)
  }
};
