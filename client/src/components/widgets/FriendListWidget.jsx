import FriendProfile from "../FriendProfile"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../../store/store"

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <div className="bg-gray-200 pt-6 pr-3 pb-7 pl-4 rounded-lg mt-8">
      <div className="text-xl font-semibold text-gray-600 mb-6">
        Friends
      </div>
      <div className="flex flex-col space-y-6">
        {Array.isArray(friends) &&
          friends.map((friend) => (
            friend._id ? (
              <FriendProfile
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.location}
                userPicturePath={friend.picturePath}
              />
            ) : null
          ))}
      </div>
    </div>
  )
}

export default FriendListWidget