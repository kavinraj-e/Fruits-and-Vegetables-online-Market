import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = ({ product }) => {
  const addToWishlist = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/wishlist/add`, { productId: product._id }, { withCredentials: true });
      toast.success("Added to Wishlist");
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      toast.error("Failed to add to Wishlist");
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-40 object-cover rounded-md mb-2" 
        />
        <h2 className="text-xl font-semibold truncate">{product.name}</h2>
        <p className="text-gray-600">Category: {product.category}</p>
        
        <p className="text-gray-600"> Origin: {product. origin}</p>
        <p className="text-green-500 font-bold">price: ${product.price}</p>
        
        <div className="flex justify-between items-center mt-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToWishlist();
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
