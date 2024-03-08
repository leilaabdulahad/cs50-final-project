const ProfileImg = ({ image, size = "60px" }) => {
  return (
    <div className="rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <img
        alt="user profile"
        src={`http://localhost:3001/assets/${image}`}
        className="w-full h-full object-cover rounded-full cursor-pointer hover:opacity-80" 
      />
    </div>
  )
}

export default ProfileImg;