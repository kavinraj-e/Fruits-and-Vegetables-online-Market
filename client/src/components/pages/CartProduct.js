import React, { useState } from 'react';
import { toast } from 'react-toastify';

function CartProduct({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/update/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }
      const updatedCart = await response.json();
      setQuantity(newQuantity);
      toast.success('Item quantity updated');
    } catch (error) {
      console.error('Error updating item quantity:', error);
      // Handle error
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/remove/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      toast.success('Removed successfully!');
      window.location.href = '/cart';
    
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      // Handle error
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center py-8 md:py-10 lg:py-8 border-t border-gray-200">
      <div className="w-full lg:w-1/4">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-full h-48 object-center object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex flex-col justify-between w-full lg:w-3/4 lg:pl-6 mt-6 lg:mt-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{item.product.name}</h2>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg"
              onClick={() => updateQuantity(item._id, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              className="w-12 h-8 text-center border rounded-lg focus:outline-none"
              onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
              min="1"
            />
            <button
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg"
              onClick={() => updateQuantity(item._id, quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600">Category: {item.product.category}</p>
        <p className="text-sm text-gray-600">Origin: {item.product.origin}</p>
        <p className="text-sm text-gray-600 mt-2">{item.product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <button
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => toast.info('Added to favorites!')}
            >
              Add to favorites
            </button>
            <button
              className="text-sm text-red-500 hover:text-red-700"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
          <p className="text-lg font-semibold text-gray-800">${item.product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
