const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authenticateUser");
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/addtocart',  authMiddleware,cartController.addToCart);

// Get cart items
router.get('/cart', authMiddleware, cartController.getCartItems);

// Remove item from cart
router.delete('/remove/:itemId', authMiddleware, cartController.removeItem);

// Update item quantity in cart
router.put('/update/:itemId', authMiddleware, cartController.updateQuantity);

module.exports = router;
