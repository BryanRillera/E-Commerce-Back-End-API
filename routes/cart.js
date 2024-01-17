const express = require('express');
const cartController = require("../controllers/cart");
const productController = require("../controllers/product");
const userController = require("../controllers/user");

const router = express.Router();

// Route for creating an order 
router.post('/add', cartController.addToCart);

// Route for creating an order 
router.delete('/remove', cartController.removeFromCart);

// Route for cal
router.get('/calculateTotal', cartController.calculateCartTotal);

module.exports = router;