const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authenticateUser");
const { getElementById, getAllProducts, createProduct } = require('../controllers/FruitsControllers');

// Routes
router.get('/products/:id',getElementById);
router.get('/products', getAllProducts);
router.post('/product', createProduct);

module.exports = router;
