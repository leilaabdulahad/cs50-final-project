import ProfileImg from './ProfileImg'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFriends } from "../store/store"
import { FaUserPlus, FaUserMinus } from "react-icons/fa6"
import '../index.css'

const FriendProfile = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)
  const isFriend = Array.isArray(friends) ? friends.find((friend) => friend._id === friendId) : undefined;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

      return (
        <div className="relative flex flex-col">
          <div className="flex gap-4">
            <ProfileImg image={userPicturePath} size="64px" />
            <div
              onClick={() => {
                navigate(`/profile/${friendId}`)
                navigate(0)
              }}
              className="cursor-pointer"
            >
              <div className="text-xl mt-2 pr-8 font-semibold text-blue-500 hover:text-blue-400">
                {name}
              </div>
              <div className="text-base text-gray-500 ">
                {subtitle}
              </div>
            </div>
          </div>
          {/* id not the same as friendId then show the button */}
          {_id !== friendId && (
            <button
              onClick={() => patchFriend()}
              className="absolute top-0 right-0 mr-1 mt-1 py-2 outline-none focus:outline-none mb-2"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              {isFriend ? <FaUserMinus /> : <FaUserPlus />}
            </button>
          )}
        </div>
      )
          }
      export default FriendProfile