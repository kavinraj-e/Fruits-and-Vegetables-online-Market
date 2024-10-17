import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'GET',
        credentials: 'include', 
      });

      if (response.ok) {
        
        console.log('Logged out successfully');
        window.location.href = '/login'; // Redirect to login page or home page
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <section className="relative mx-auto">

      <nav className="flex justify-between bg-gray-900 text-white w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <Link to="/" className="text-3xl font-bold font-heading">
            Fruxo
          </Link>
  
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li><Link to="/" className="hover:text-orange-600">Home</Link></li>
            <li><Link to="/category" className="hover:text-orange-600">Category</Link></li>
            <li><Link to="/Service" className="hover:text-orange-600">Service</Link></li>
            <li><Link to="/contact" className="hover:text-orange-600">Contact Us</Link></li>
          </ul>

          <div className="hidden xl:flex space-x-5 items-center">
            <Link to="/Wishlist" className="hover:text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <Link className="flex items-center hover:text-orange-600" to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </Link>
       
            <div className="relative">
              <button onClick={handleProfileMenuToggle} className="flex items-center hover:text-orange-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
                  <Link to="/upload" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Upload</Link>
                  <h6 onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</h6>
                </div>
              )}
            </div>
          </div>
        </div>
    
        <Link to="/cart" className="xl:hidden flex mr-6 hover:text-orange-600 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="flex absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </Link>
        <Link to="/" className="navbar-burger self-center mr-12 xl:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Link>
      </nav>
    </section>
  );
}

export default Header;
