// const ProfileImg = ({ image, size = "60px" }) => {
//   return (
//     <div className="rounded-full overflow-hidden" style={{ width: size }}>
//       <img
//         alt="user profile"
//         src={`http://localhost:3001/assets/${image}`}
//         className="w-full h-auto object-cover rounded-full cursor-pointer hover:opacity-80" 
//         style={{ aspectRatio: '1 / 1' }} // Maintain 1:1 aspect ratio
//       />
//     </div>
//   )
// }

// export default ProfileImg;
import './widgets/css/userWidget.css'


const ProfileImg = ({ image, size = "60px" }) => {
  return (
    <div className={`rounded-full overflow-hidden sm:block md:w-${size} md:h-${size} lg:w-${size} lg:h-${size}`} style={{ width: size, height: size }}>
      <img
        alt="user profile"
        src={`http://localhost:3001/assets/${image}`}
        className=" w-full h-auto md:w-full md:h-full lg:w-full lg:h-full object-cover rounded-full cursor-pointer hover:opacity-80" 
      />
    </div>
  )
}

export default ProfileImg;
