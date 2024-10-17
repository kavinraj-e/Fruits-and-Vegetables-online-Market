const express = require('express');
const router = express.Router();
const AdminAndFarmer = require('../controllers/AdminAndFarmer');

// Create a new product
router.post('/farmer/createproduct', AdminAndFarmer.createProduct);

// Update a product
router.put('/farmer/:id', AdminAndFarmer.updateProduct);

// Delete a product
router.delete('/farmer/:id', AdminAndFarmer.deleteProduct);

module.exports = router;
