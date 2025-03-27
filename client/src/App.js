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
import Category from './components/pages/Category';
import Service from './components/pages/Service';
import Contact from './components/pages/Contact';
import Hero from './components/Layout/Hero';
import Chatbot from './components/pages/Chatbot';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthRedirect /> 
        <Header />
       
      <Chatbot />
  

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home/>} />
          <Route path="/upload" element={<FruitsUpload />} />
          <Route path="*" element={<Error />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/category" element={<Category />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admindashboard />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}


function AuthRedirect() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = Cookies.get('token'); 

    if (token) {
      try {
        const decoded = jwtDecode(token); 
        const userRole = decoded.roles; 

        setRole(userRole);
        console.log(token+"      get-cookie"); 

        
        if (userRole.includes('admin')) {
          navigate('/home'); 
        } else {
          navigate('/home'); 
        }
      } catch (error) {
        console.error('Invalid token', error);
        navigate('/login'); 
      }
    } else {
      navigate('/login'); 
    }
  }, []);

  return null; 
}


export default App;