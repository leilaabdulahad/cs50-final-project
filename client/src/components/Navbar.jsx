import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../store/store'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isOpen = isMobileMenuToggled

  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/')
  }

  const handleMenuToggle = () => {
    setIsMobileMenuToggled(!isMobileMenuToggled)
  }

  const handleLinkClick = () => {
    setIsMobileMenuToggled(false)
  }

  const handleCloseButtonClick = () => {
    setIsMobileMenuToggled(false)
  }

  return (
    <nav className="bg-gray-600">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/home" className="font-medium text-white text-2xl hover:text-gray-300">
              Connectify
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button onClick={handleMenuToggle} type="button" className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white ${isMobileMenuToggled ? 'hidden' : ''}`} aria-expanded="false">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <button onClick={handleMenuToggle} type="button" className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white ${!isMobileMenuToggled ? 'hidden' : ''}`} aria-expanded="false">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <nav className="flex space-x-4">
              <Link to="/home" onClick={handleLinkClick} className="text-base font-medium text-white hover:text-gray-300">
                Home
              </Link>
              <a href="#" onClick={handleLinkClick} className="text-base font-medium text-white hover:text-gray-300">
                Messages
              </a>
              <a href="#" onClick={handleLinkClick} className="text-base font-medium text-white hover:text-gray-300">
                Notifications
              </a>
              <button onClick={handleLogout} className="text-base font-medium text-white hover:text-gray-300">
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuToggled ? '' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/home" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300">
            Home
          </Link>
          <a href="#" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300">
            Messages
          </a>
          <a href="#" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300">
            Notifications
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <button onClick={handleLogout} className="text-base font-medium text-white hover:text-gray-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
