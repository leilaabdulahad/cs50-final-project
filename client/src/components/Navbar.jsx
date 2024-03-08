import { useState } from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { setLogout } from '../store/store'

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const fullName = `${user.firstName} ${user.lastName}`
  const isNonMobileScreens = useMediaQuery({ query: '(min-width:600px)' })
  
  return (
    <div className='mt-8'>
    {/* Navigation bar, desktop */}
    {isNonMobileScreens && (
      <div className="flex justify-between items-center">
        <h1 className="cursor-pointer text-blue-500 hover:text-blue-300" onClick={() => navigate("/home")}>
          Connectify
        </h1>
        <div className="flex gap-4">
          <div className="flex gap-2 cursor-pointer">
            <div onClick={() => navigate('/home')} className="hover:text-blue-500">Home</div>
            <div className="hover:text-blue-500">Messages</div>
            <div className="hover:text-blue-500">Notifications</div>
            <div className="hover:text-blue-500">Settings</div>
            <div className="hover:text-blue-500">Dark mode</div>
          </div>
          <select
            value={fullName}
            onChange={(e) => {
              if (e.target.value === 'Log Out') {
                dispatch(setLogout());
              }
            }}
            className="w-48 px-4 py-2 rounded border border-gray-300"
          >
            <option value={fullName}>{fullName}</option>
            <option value="Log Out">Log Out</option>
          </select>
        </div>
      </div>
    )}
      {/* Navigation bar, mobile */}
      {!isNonMobileScreens && (
        <div>
          <button onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} className="md:hidden">
            <MenuIcon className="w-6 h-6" />
          </button>

          {isMobileMenuToggled && (
            <div className="fixed inset-0 flex flex-col justify-center items-center gap-8 p-8 bg-gray-200">
              <button onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} className="absolute top-4 right-4">
                <XIcon className="w-6 h-6" />
              </button>
              <div className="flex flex-col gap-4 cursor-pointer">
                <div onClick={() => navigate('/home')}>Home</div>
                <div>Messages</div>
                <div>Notifications</div>
                <div>Settings</div>
                <div>Dark mode</div>
              </div>
              <select
                value={fullName}
                onChange={(e) => {
                  if (e.target.value === 'Log Out') {
                    dispatch(setLogout());
                  }
                }}
                className="w-48 px-4 py-1 rounded border border-gray-300"
              >
                <option value={fullName}>{fullName}</option>
                <option onClick={() => dispatch(setLogout())}>Log Out</option>
              </select>
            </div>
          )}
          </div>
      )}
    </div>

  )
}

export default Navbar
