import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import FriendListWidget from "../components/widgets/FriendListWidget"
// import CreatePostWidget from "../components/widgets/CreatePostWidget"
import PostsContainerWidget from "../components/widgets/PostsContainerWidget"
import UserWidget from "../components/widgets/UserWidget"
import { setPosts } from "../store/store"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)
  const dispatch = useDispatch()

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, [userId, token])

  useEffect(() => {
    if (!user) return
    const fetchPosts = async () => {
      const url = `http://localhost:3001/posts/${userId}/posts`;
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json();
      const userPosts = data.filter(post => post.userId === userId); // Filter the posts based on the userId
      dispatch(setPosts({ posts: userPosts }))
    }

    fetchPosts();
  }, [userId, token, user, dispatch])

  if (!user) return null

  return (
    <div>
      <Navbar />
      <div className="w-full px-6 py-8 flex flex-col md:flex-row md:justify-center gap-8">
        <div className="w-full mt-4 md:w-1/4">
          {user && <UserWidget userId={userId} picturePath={user.picturePath} />}
          <div className="mt-2" />
          {user && <FriendListWidget userId={userId} />}
        </div>
        <div className="w-full mt-8 md:w-2/5">
          {/* {loggedInUserId === userId && <CreatePostWidget picturePath={user.picturePath} />} */}
          <div className="mb-22" />
          {user && <PostsContainerWidget userId={userId} isProfile />}
          </div>
      </div>
    </div>
  )
}

export default ProfilePage