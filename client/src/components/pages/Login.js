import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true });
      console.log(response.data); // Assuming response is { message: 'Login successful' }
      toast.success('Login Fetch successfully!');
      // Redirect or handle successful login as needed
      nav("/");

    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input type="password" id="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
