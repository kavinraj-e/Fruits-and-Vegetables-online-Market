import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FruitsUpload from './components/pages/FruitsUpload';
import Error from './components/pages/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './components/pages/ProductDetails';
import Cart from './components/pages/Cart';
import SignIn from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Logout from './components/pages/Logout';
import Wishlist from './components/pages/Wistlist';
import Admindashboard from './components/pages/Admindashboard';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthRedirect /> {/* Handles redirection based on user role */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<FruitsUpload />} />
          <Route path="*" element={<Error />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admindashboard />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

// ✅ Function to handle user redirection based on role
function AuthRedirect() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = Cookies.get('token'); // Get token from cookies

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        const userRole = decoded.roles; // Extract roles (array)

        setRole(userRole);
        console.log(userRole); // Debugging

        // ✅ Corrected condition for array
        if (userRole.includes('admin')) {
          navigate('/admin'); // Redirect admin users to the admin dashboard
        } else {
          navigate('/'); // Redirect normal users to the homepage
        }
      } catch (error) {
        console.error('Invalid token', error);
        navigate('/login'); // Redirect to login if token is invalid
      }
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, []);

  return null; // This component doesn’t render anything
}


export default App;