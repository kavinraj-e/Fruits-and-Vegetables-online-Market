import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify';

const Product = ({ product }) => {
  // Function to handle adding item to wishlist
  const addToWishlist = async () => {
    try {
      await axios.post('http://localhost:8000/api/wishlist/add', { productId: product._id }, { withCredentials: true });
      toast.success("Added to Wishlist"); // Show success message
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      toast.error("Failed to add to Wishlist"); // Show error message
    }
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      <Link to={`/product/${product._id}`}>
        <div className="w-full h-64 overflow-hidden"> {/* Fixed height and width for image container */}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover" // Ensure the image covers the container
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-gray-500 text-sm uppercase">{product.brand || 'Brand'}</span>
        <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
          <span className="text-sm text-gray-600">1Kg</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Link 
            to={`/product/${product._id}`} 
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus mr-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
            Add to Cart
          </Link>
          <button 
            onClick={addToWishlist} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="M8 14s-5-3.5-5-7c0-2.5 2-4 5-4s5 1.5 5 4c0 3.5-5 7-5 7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;