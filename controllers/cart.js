const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require("../models/User");
const auth = require("../auth");

// [SECTION] Route for adding product to cart
module.exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
      await newCart.save();
    } else {
      // If the user has a cart, check if the product is already added
      const existingItem = cart.items.find(item => item.productId.equals(productId));

      if (existingItem) {
        // If the product exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If the product doesn't exist, add a new item
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// [SECTION] Route for removing product to cart
module.exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// [SECTION] Route for calculating total of items in the cart
module.exports.calculateCartTotal = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    let subtotal = 0;
    for (const item of cart.items) {
      const product = item.productId;
      subtotal += product.price * item.quantity;
    }
    
    res.json({
      
      subtotal,
      total: subtotal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
