
  import { FaRegImage } from "react-icons/fa"
  import Dropzone from "react-dropzone"
  import { useState } from "react"
  import { useDispatch, useSelector } from "react-redux"
  import { setPosts } from "../../store/store"
  import { MdDeleteOutline } from "react-icons/md"

  
  
  const CreatePostWidget = ({ picturePath }) => {
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const [post, setPost] = useState("")

    const handlePost = async () => {
      const formData = new FormData()
      formData.append("userId", _id)
      formData.append("description", post)
      if (image) {
        formData.append("picture", image)
        formData.append("picturePath", image.name)
      }
  
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const posts = await response.json()
      dispatch(setPosts({ posts }))
      setImage(null)
      setPost("")
    }
  
    return (
      <div className="bg-gray-200 p-6 rounded-lg">
        <div className="flex justify-between items-center gap-6 mb-4">
          <input
            type="text"
            placeholder="Write something here..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            className="w-full bg-white rounded-xl p-3"
          />
        </div>

        {isImage && (
          <div className="border border-gray-300 rounded mt-4 p-4">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex items-center gap-4">
                  <div
                    {...getRootProps()}
                    className="border-2 p-4 w-full cursor-pointer hover:border-gray-400"
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add your image here</p>
                    ) : (
                      <div className="text-base">
                        {image.name}
                      </div>
                    )}
                  </div>
                  {image && (
                    <button
                      onClick={() => setImage(null)}
                      className="w-10 ml-2"
                    >
                      <MdDeleteOutline size={25} />
                    </button>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        )}

        <hr className="my-4" />

        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsImage(!isImage)}>
            <div className="text-gray-400">
              
            </div>
            <div className="flex items-center text-base text-gray-500 hover:text-gray-400">
            <FaRegImage size={20} /> 
            <span className="ml-2">Image</span>
            </div>
          </div>
          <button
            disabled={!post}
            onClick={handlePost}
            className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out ${!post && 'opacity-50 cursor-not-allowed'}`}
          >
            POST
          </button>
        </div>
      </div>
    );
  }
  export default CreatePostWidget
  