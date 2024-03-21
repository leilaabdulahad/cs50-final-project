import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProfileImg from "../ProfileImg"
import { FaLocationDot } from "react-icons/fa6"
import '../../index.css'
import './css/userWidget.css'

const UserWidget = ({ userId, picturePath }) => {
  const token = useSelector((state) => state.token)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
 
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setUser(data)
    }

    getUser()
  }, [userId, token])

  if (!user) {
    return null
  }

  const { firstName, lastName, location, friends } = user
  return (
    <div className="w-full flex flex-col px-4 pt-8 pb-3 cursor-pointer mt-8 rounded-lg bg-gray-200" onClick={() => navigate(`/profile/${userId}`)}>
      <div className="flex gap-4">
        <div>
          <img
            className="user-widget-image"
            alt="user profile"
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        </div>
        <div className="mr-4">
          <h4 className="user-widget-name font-sans text-blue-500 hover:text-blue-400">
            {firstName} {lastName}
          </h4>
          <p className="text-gray-500">
            {Array.isArray(friends) ? `${friends.length} ${friends.length === 1 ? 'friend' : 'friends'}` : 'No friends'}
          </p>
        </div>
      </div>
      <hr className="my-2 border-t-2 border-gray-300" />  

      <div className="ml-2 py-2 flex items-center gap-2">
        <FaLocationDot size={20} />
        <p className="text-gray-500 mt-1">
          {location}
        </p>
      </div>
    </div>
  )
}

export default UserWidget