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


exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      Object.keys(req.body).forEach(key => {
        product[key] = req.body[key];
      });
  
      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(id); // Corrected this line
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//// admin routes



