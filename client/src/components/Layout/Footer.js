import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white-500 mb-4">Fruxo</h2>

        <div className="flex justify-center space-x-6 mb-4 text-lg">
          <Link to="/home" className="hover:text-orange-500 transition">
            Home
          </Link>
          <Link to="/service" className="hover:text-orange-500 transition">
            Services
          </Link>
          <Link to="/about" className="hover:text-orange-500 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-orange-500 transition">
            Contact
          </Link>
        </div>
        <p className="text-gray-400 text-sm">
          © 2025 Fruxo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
