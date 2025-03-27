import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
   
    getAllWishlist();
  }, []);

  const getAllWishlist = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wishlist/getall`, { withCredentials: true });
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
  
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/wishlist/remove`, { productId }, { withCredentials: true });
      
      getAllWishlist();
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/addtocart`, { productId: productId, quantity: 1 }, { withCredentials: true });
      toast.success('Item added to cart successfully!');
    } catch (error) {
      toast.error('Login first to continue!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map(item => (
          <div key={item._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={item.productId.imageUrl}
              alt={item.productId.name}
              className="w-full h-48 object-cover mb-4"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.productId.name}</h3>
              <p className="text-gray-600 text-sm mb-2">${item.productId.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => addToCart(item.productId._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.productId._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
