const express = require('express');
const router = express.Router();
const AdminAndFarmer = require('../controllers/AdminAndFarmer');


router.post('/farmer/createproduct', AdminAndFarmer.createProduct);


router.put('/farmer/:id', AdminAndFarmer.updateProduct);


router.delete('/farmer/:id', AdminAndFarmer.deleteProduct);

module.exports = router;
