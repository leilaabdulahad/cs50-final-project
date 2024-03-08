import mongoose from "mongoose"

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        text: {
          type: String, 
          required: true,
        },
        userId: {
          type: String, // Assuming userId is the correct field now
          required: true,
        },
        timestamp: {
          type: Date, 
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } 
);

const Post = mongoose.model("Post", postSchema)

export default Post
