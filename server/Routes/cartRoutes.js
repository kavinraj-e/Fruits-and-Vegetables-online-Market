const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authenticateUser");
const cartController = require('../controllers/cartController');

router.post('/addtocart',  authMiddleware,cartController.addToCart);


router.get('/cart', authMiddleware, cartController.getCartItems);


router.delete('/remove/:itemId', authMiddleware, cartController.removeItem);


router.put('/update/:itemId', authMiddleware, cartController.updateQuantity);

module.exports = router;
