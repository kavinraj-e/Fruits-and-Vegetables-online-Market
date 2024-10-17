// models/Wishlist.js

const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
