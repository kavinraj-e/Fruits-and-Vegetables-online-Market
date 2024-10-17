import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify';
const Product = ({ product }) => {
  // Function to handle adding item to wishlist
  const addToWishlist = async () => {
    try {
  
       await axios.post('http://localhost:8000/api/wishlist/add', { productId: product._id},{withCredentials:true});
      toast.success("Add to Wishlish"); // Log response message
      // You can update UI here if needed, like showing a success message or changing the icon color
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className=''>
    <div className="bg-white shadow-md hover:scale-30 hover:shadow-xl duration-500">
      <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt="Product" className="h-50 w-80 object-cover" />
      </Link>
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
        <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
          <p className="text-sm text-gray-600 cursor-auto ml-2">1Kg</p>
          <div className="ml-auto gap-3 flex">
            <Link to={`/product/${product._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </Link>
            <button onClick={addToWishlist}>
              {/* Use heart icon here */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 14s-5-3.5-5-7c0-2.5 2-4 5-4s5 1.5 5 4c0 3.5-5 7-5 7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Product;
