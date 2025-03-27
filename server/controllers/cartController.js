const Cart = require('../models/cartModel');
const Product = require("../models/FruitsModels")
const jwt = require("jsonwebtoken");


exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ error: 'JWT token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const parsedProductId = String(productId);
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    let item = cart.items.find(item => String(item.productId) === parsedProductId);

    if (item) {

      item.quantity += parsedQuantity;
    } else {
     
      cart.items.push({ productId: parsedProductId, quantity: parsedQuantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid JWT token' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getCartItems = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ error: 'JWT token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItemsWithDetails = await Promise.all(cart.items.map(async (item) => {
      const product = await Product.findById(item.productId);
      return { ...item.toObject(), product };
    }));

    res.status(200).json({ items: cartItemsWithDetails, totalprice: cart.totalprice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeItem = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ error: 'JWT token is missing' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const itemId = req.params.itemId;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateQuantity = async (req, res) => {

  const itemId = req.params.itemId;
  const { quantity } = req.body;
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ error: 'JWT token is missing' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId, 'items._id': itemId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};





exports.getwishItems = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ error: 'JWT token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItemsWithDetails = await Promise.all(cart.items.map(async (item) => {
      const product = await Product.findById(item.productId);
      return { ...item.toObject(), product };
    }));

    res.status(200).json({ items: cartItemsWithDetails, totalprice: cart.totalprice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
