import React, { useState, useEffect } from 'react';
import CartItems from './CartItmes';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cart', {
        method: 'GET',
        credentials: 'include' // Send cookies with the request
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error
    }
  };

  

  return (
    <div>
    <div>
     <CartItems cartItems={cartItems} />
    </div>

</div>

  );
};

export default Cart;
