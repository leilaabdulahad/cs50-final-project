import User from "../models/User.js";

// Helper function to find a user by ID
const findUserById = async (userId) => {
  return await User.findById(userId);
};

// Helper function to format friends list
const formatFriends = (friends) => {
  return friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );
};

// Helper function to handle errors
const handleError = (res, err) => {
  res.status(404).json({ message: err.message });
};

// Get users from database 
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    res.status(200).json(user);
  } catch (err) {
    handleError(res, err);
  }
};
// Get user's friends from database
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    const friends = await Promise.all(
      user.friends.map((id) => findUserById(id))
    );
    const formattedFriends = formatFriends(friends)
    res.status(200).json(formattedFriends)
  } catch (err) {
    handleError(res, err)
  }
}

// Add or remove a friend from user's friends list
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await findUserById(id);
    const friend = await findUserById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }
    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map((id) => findUserById(id))
    )
    const formattedFriends = formatFriends(friends)

    res.status(200).json(formattedFriends)
  } catch (err) {
    handleError(res, err)
  }
}