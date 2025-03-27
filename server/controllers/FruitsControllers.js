const Product = require('../models/FruitsModels');


exports.createProduct = async (req, res) => {
  const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantityAvailable: req.body.quantityAvailable,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      origin: req.body.origin
  });

  try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};


exports.getElementById = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };