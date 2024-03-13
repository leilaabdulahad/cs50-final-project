const ProfileImg = ({ image, size = "60px" }) => {
  return (
    <div className="rounded-full overflow-hidden" style={{ width: size }}>
      <img
        alt="user profile"
        src={`http://localhost:3001/assets/${image}`}
        className="w-full h-auto object-cover rounded-full cursor-pointer hover:opacity-80" 
        style={{ aspectRatio: '1 / 1' }} // Maintain 1:1 aspect ratio
      />
    </div>
  )
}

export default ProfileImg;
