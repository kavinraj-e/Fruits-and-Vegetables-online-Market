import React, { useState } from 'react';
import { toast } from 'react-toastify';

function CartProduct({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:8000/api/update/${item._id}`, {
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
      toast.success('items Quantity Updated',newQuantity );
    } catch (error) {
      console.error('Error updating item quantity:', error);
      // Handle error
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/remove/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      toast.success('Remove successfully!');
      window.location.href = 'http://localhost:3000/cart';
    
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
   
    } catch (error) {
      console.error('Error removing item:', error);
      // Handle error
    }
  };

  return (
    <div className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
      <div className="md:w-4/12 2xl:w-1/4 w-full">
        <img src={item.product.imageUrl} alt={item.product.name} className="h-full object-center object-cover md:block hidden" />
        <img src={item.product.imageUrl} alt={item.product.name} className="md:hidden w-full h-full object-center object-cover" />
      </div>
      <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
        <div className="flex items-center justify-between w-full">
          <p className="text-base font-black leading-none text-gray-800">{item.product.name}</p>
          <div className="flex items-center">
            <button
              className="px-2 py-1 bg-gray-200 text-gray-800"
              onClick={() => updateQuantity(item._id, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <button
              type="number"
              value={quantity}
              className="w-6 h-6 border border-gray-200 text-center focus:outline-none mx-2"
              onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
              min="1"
            >
      {quantity}
              </button>
            <button
              className="px-2 py-1 bg-gray-200 text-gray-800"
              onClick={() => updateQuantity(item._id, quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <p className="text-xs leading-3 text-gray-600 pt-2">Type: {item.product.category}</p>
        <p className="text-xs leading-3 text-gray-600 py-4">Origin: {item.product.origin}</p>
        <p className="w-96 text-xs leading-3 text-gray-600">Description: {item.product.description}</p>
        <div className="flex items-center justify-between pt-5">
          <div className="flex items-center">
            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={() => removeItem(item._id)}>Remove</p>
          </div>
          <p className="text-base font-black leading-none text-gray-800">${item.product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
