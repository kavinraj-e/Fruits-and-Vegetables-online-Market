const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const FruitsModels = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantityAvailable: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String, enum: ['fruit', 'vegetable'], required: true },
    origin: { type: String, required: true },

}, {
    timestamps: true 
});

const Product = mongoose.model('Product', FruitsModels);

module.exports = Product;
