const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for fruits and vegetables
const FruitsModels = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantityAvailable: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String, enum: ['fruit', 'vegetable'], required: true },
    origin: { type: String, required: true },
    // You can add more fields like weight, etc. as per your requirements
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Define mongoose model for products using the schema
const Product = mongoose.model('Product', FruitsModels);

module.exports = Product;
