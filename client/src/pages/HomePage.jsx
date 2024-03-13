import { useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import UserWidget from "../components/widgets/UserWidget"
import CreatePostWidget from "../components/widgets/CreatePostWidget"
import PostsContainerWidget from "../components/widgets/PostsContainerWidget"
import AdvertWidget from "../components/widgets/AdvertisementWidget"
import FriendListWidget from "../components/widgets/FriendListWidget"

const HomePage = () => {
  console.log('HomePage called')
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full px-4 md:px-24 py-8 flex flex-col md:flex-row gap-2 justify-between">
        <div className="flex-none w-full md:w-1/4">
          <UserWidget userId={_id} picturePath={picturePath} />
          <FriendListWidget userId={_id} />
        </div>
        <div className="flex-grow mt-8 w-full md:w-1/2">
          <CreatePostWidget picturePath={picturePath} />
          <PostsContainerWidget userId={_id} />
        </div>
        <div className="flex-none w-full md:w-1/4">
          <div className="my-8" />
          <AdvertWidget />
        </div>
      </div>
    </div>
  )
}

export default HomePage