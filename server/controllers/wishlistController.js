const Wishlist = require('../models/WishlistItem');
const Product = require('../models/FruitsModels');
const jwt = require('jsonwebtoken')

exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ error: 'JWT token is missing' });
    }
  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const newItem = new Wishlist({
            productId,
            userId
        });
        await newItem.save();
        res.status(200).json({ message: 'Item added to wishlist successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.removeFromWishlist = async (req, res) => {
    const { productId} = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ error: 'JWT token is missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        await Wishlist.deleteOne({ productId, userId });
        res.status(200).json({ message: 'Item removed from wishlist successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllWishlist = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ error: 'JWT token is missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const wishlistItems = await Wishlist.find({ userId }).populate('productId');
        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};