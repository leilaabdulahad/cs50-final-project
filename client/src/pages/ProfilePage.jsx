import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import FriendListWidget from "../components/widgets/FriendListWidget"
import CreatePostWidget from "../components/widgets/CreatePostWidget"
import PostsContainerWidget from "../components/widgets/PostsContainerWidget"
import UserWidget from "../components/widgets/UserWidget"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) return null

  return (
    <div>
      <Navbar />
      <div className="w-full px-6 py-8 flex flex-col md:flex-row md:justify-center gap-8">
        <div className="w-full md:w-1/4">
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <div className="my-8" />
          <FriendListWidget userId={userId} />
        </div>
        <div className="w-full mt-8 md:w-2/5">
          {loggedInUserId === userId && <CreatePostWidget picturePath={user.picturePath} />}
          <div className="my-8" />
          <PostsContainerWidget userId={userId} isProfile />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage