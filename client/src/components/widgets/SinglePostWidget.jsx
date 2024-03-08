  import FriendProfile from "../FriendProfile"
  import { useState } from "react"
  import { useDispatch, useSelector } from "react-redux"
  import { setPost, removePost } from "../../store/store"
  import React from 'react'
  import { FaRegHeart, FaHeart } from "react-icons/fa"
  import { IoChatboxEllipsesOutline } from "react-icons/io5"
  import { MdDeleteOutline } from "react-icons/md"

  const SinglePostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false)
    const [newComment, setNewComment] = useState('')
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json()
      dispatch(setPost({ post: updatedPost }))
    }
  
    const deletePost = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        dispatch(removePost({ postId }));
      }
    }

    const addComment = async (event) => {
      event.preventDefault()
      
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, text: newComment }), // Include userId
      });
      const updatedPost = await response.json()
      dispatch(setPost({ post: updatedPost }))
      setNewComment('')
    }
    
    
    return (
    <div className="relative bg-gray-200 p-4 rounded-lg mb-2 mt-4">
      <FriendProfile
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
    <div className="h5 text-main-color mt-4">
      {description}
    </div>
    {picturePath && (
      <img
        className="w-full h-auto mt-3 rounded-lg"
        alt="post"
        src={`http://localhost:3001/assets/${picturePath}`}
      />
    )}

    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-lg mr-2">
            {likeCount}
          </span>
          {isLiked ? (
            <FaHeart size={25} onClick={patchLike} />
          ) : (
            <FaRegHeart size={25} onClick={patchLike} />
          )}
        </div>
        <div className="flex items-center">
          


          <button onClick={() => setIsComments(!isComments)} className="focus:outline-none">
            <IoChatboxEllipsesOutline size={25} />
          </button>
          <span className="text-base ml-2">
            {comments.length}
          </span>

          {isComments && (
            <div>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <p key={index}>{comment.text}</p> // Change this line
                ))
              ) : (
                <p>No comments</p>
              )}

              <form onSubmit={addComment}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(event) => setNewComment(event.target.value)}
                  placeholder="Write a comment..."
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}


        </div>
      </div>
    </div>
    {postUserId === loggedInUserId && (
      <button onClick={deletePost} className="absolute bottom-2 right-2 focus:outline-none mb-2">
        <MdDeleteOutline size={25} />
      </button>
    )}
  </div>
)
    }

export default React.memo(SinglePostWidget)