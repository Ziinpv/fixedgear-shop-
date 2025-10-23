const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Public APIs
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

// Optional minimal admin APIs (not authenticated in this demo)
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
