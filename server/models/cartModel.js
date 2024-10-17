const mongoose = require('mongoose');
const Product = require('./FruitsModels'); // Import the Product model

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  totalprice: {
    type: Number,
    default: 0
  }
});

// Pre-save middleware to calculate total price
cartSchema.pre('save', async function (next) {
  const cart = this;
  let total = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    total += product.price * item.quantity; // Assuming the Product model has a 'price' field
  }

  cart.totalprice = total;
 
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
