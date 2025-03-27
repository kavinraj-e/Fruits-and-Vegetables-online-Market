const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');

router.post('/add', WishlistController.addToWishlist);
router.post('/remove', WishlistController.removeFromWishlist);
router.get('/getall', WishlistController.getAllWishlist);

module.exports = router;
