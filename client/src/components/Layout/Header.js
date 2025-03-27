import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FaHeart, FaShoppingCart, FaUserCircle } from 'react-icons/fa'

function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserRole(decoded.roles)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Invalid token', error)
        setIsLoggedIn(false)
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
        method: 'GET',
        credentials: 'include'
      })
      if (response.ok) {
        Cookies.remove('token')
        navigate('/login')
      } else {
        console.error('Failed to logout')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleProfileMenuToggle = () => setIsProfileMenuOpen(!isProfileMenuOpen)
  const handleMenuOptionClick = () => setIsProfileMenuOpen(false)

  return (
    <header className="w-full bg-gray-900 text-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-white-500">
          Fruxo
        </Link>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/home" className="hover:text-orange-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/category" className="hover:text-orange-500 transition">
              Category
            </Link>
          </li>
          <li>
            <Link to="/service" className="hover:text-orange-500 transition">
              Service
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link to="/wishlist" className="hover:text-orange-500 transition">
            <FaHeart className="text-xl" />
          </Link>

          <Link to="/cart" className="hover:text-orange-500 transition">
            <FaShoppingCart className="text-xl" />
          </Link>

          <button onClick={handleProfileMenuToggle} className="hover:text-orange-500 transition">
            <FaUserCircle className="text-xl" />
          </button>

          {isProfileMenuOpen && (
            <div
              ref={profileMenuRef}
              className="absolute right-4 top-14 bg-white text-gray-800 w-48 rounded-md shadow-md py-2 z-50" // ✅ z-50 applied here
            >
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuOptionClick}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuOptionClick}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {userRole.includes('admin') && (
                    <>
                      <Link
                        to="/upload"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuOptionClick}
                      >
                        Upload
                      </Link>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuOptionClick}
                      >
                        Admin
                      </Link>
                    </>
                  )}
                  <h6
                    onClick={() => {
                      handleLogout()
                      handleMenuOptionClick()
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </h6>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="md:hidden bg-gray-800 text-white py-3 flex justify-around">
        <Link to="/" className="hover:text-orange-500" onClick={handleMenuOptionClick}>
          Home
        </Link>
        <Link to="/category" className="hover:text-orange-500" onClick={handleMenuOptionClick}>
          Category
        </Link>
        <Link to="/service" className="hover:text-orange-500" onClick={handleMenuOptionClick}>
          Service
        </Link>
        <Link to="/contact" className="hover:text-orange-500" onClick={handleMenuOptionClick}>
          Contact Us
        </Link>
      </div>
    </header>
  )
}

export default Header
