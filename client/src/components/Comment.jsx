import { useSelector } from 'react-redux'

const Comment = ({ comment, deleteComment }) => {
    const loggedInUserId = useSelector((state) => state.user._id)

    return (
        <div className="flex justify-between items-center">
            <p className="text-gray-700">{comment.text}</p>
            {/* Modify the condition based on your logic */}
            {comment.userId === loggedInUserId && (
                <button 
                    onClick={() => deleteComment(comment._id)} 
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                >
                    Delete
                </button>
            )}
        </div>
    )
}

export default Comment
