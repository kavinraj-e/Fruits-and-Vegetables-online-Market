import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Fetch wishlist items when component mounts
    getAllWishlist();
  }, []);

  const getAllWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/wishlist/getall', { withCredentials:true });
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      // Handle error
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.post('http://localhost:8000/api/wishlist/remove', { productId },{ withCredentials:true });
      // Item removed successfully, update wishlist
      getAllWishlist();
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      // Handle error
    }
  };



  const addToCart = async (productId) => {

    try {
      await axios.post('http://localhost:8000/api/addtocart', { productId: productId, quantity: 1 }, { withCredentials: true });
      toast.success('Items Add to Card successfully!');
    } catch (error) {
      toast.error('Login first to Continue successfully!');
    }
  };










  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map(item => (
          <div key={item._id} className="bg-white shadow-md rounded-md p-4">
            <img src={item.productId.imageUrl} alt={item.productId.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{item.productId.name}</h3>
            <p className="text-gray-500">${item.productId.price}</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => addToCart(item.productId._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add to Cart</button>
              <button onClick={() => removeFromWishlist(item.productId._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
