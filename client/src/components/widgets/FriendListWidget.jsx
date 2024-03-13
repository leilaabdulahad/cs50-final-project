import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../store/store";
import { FaUserPlus, FaUserMinus } from "react-icons/fa6";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = Array.isArray(friends) ? friends.find((friend) => friend._id === friend._id) : undefined;

  const getFriends = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  const patchFriend = async (friendId) => {
    const response = await fetch(`http://localhost:3001/users/${userId}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="bg-gray-200 pt-6 pr-3 pb-7 pl-4 rounded-lg mt-8">
      <div className="text-xl font-semibold text-gray-600 mb-6">Friends</div>
      <div className="flex flex-col space-y-6">
        {Array.isArray(friends) &&
          friends.map((friend) => (
            friend._id ? (
              <div className="relative flex flex-col" key={friend._id}>
                <div className="flex gap-4">
                  <div className="rounded-full overflow-hidden md:hidden lg:block">
                    <img
                      alt="user profile"
                      src={`http://localhost:3001/assets/${friend.picturePath}`}
                      className="w-16 h-16 object-cover cursor-pointer hover:opacity-80"
                    />
                  </div>
                  <div className="cursor-pointer">
                    <div className="text-xl mt-2 pr-8 font-semibold text-blue-500 hover:text-blue-400">
                      {`${friend.firstName} ${friend.lastName}`}
                    </div>
                    <div className="text-base text-gray-500">{friend.location}</div>
                  </div>
                </div>
                {userId !== friend._id && (

                  <button
                    onClick={() => patchFriend(friend._id)}
                    className="absolute top-0 right-0 mr-1 mt-1 py-2 outline-none focus:outline-none mb-2"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    {isFriend ? <FaUserMinus /> : <FaUserPlus />}
                  </button>
                )}
              </div>
            ) : null
          ))}
      </div>
    </div>
  );
};

export default FriendListWidget;
