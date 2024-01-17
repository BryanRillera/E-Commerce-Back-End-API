const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const auth = require("../auth");

// [SECTION] Route for creating an order
module.exports.createOrders = async (req, res) => {
  try {
    // Destructure user ID and products from the request body
    const { userId, products } = req.body;

    // Retrieve user information from the database
    const userInfo = await User.findById(userId);

    if (req.user.isAdmin) {
      return res.send(false);
    }

    if (!userInfo) {
      // Handle the case where the user is not found
      return res.status(404).json({ error: `User with ID ${userId} not found` });
    }

    // Use Promise.allSettled instead of Promise.all to handle individual promise rejections
    const orders = await Promise.allSettled(
      products.map(async (product) => {
        const { productId, quantity } = product;

        // Retrieve product information from the database
        const productInfo = await Product.findById(productId);

        if (!productInfo) {
          // Handle the case where the product is not found
          return Promise.reject(`Product with ID ${productId} not found`);
        }

        // Calculate the total amount for the current product
        const totalAmount = productInfo.price * quantity;
        
        // Construct the soldTo using user information
        const soldTo = `${userInfo.firstName} ${userInfo.lastName}`;

        // Return order details for the current product
        return {
          userId,
          soldTo,
          products: [{ productId, quantity }],
          totalAmount
        };
      })
    );

    // Check for individual promise settlements
    const rejectedPromises = orders.filter((result) => result.status === "rejected");

    if (rejectedPromises.length > 0) {
      // Handle cases where some products were not found
      const errorMessages = rejectedPromises.map((result) => result.reason);
      return res.status(404).json({ error: errorMessages.join(", ") });
    }

    // Extract the fulfilled values from the settled promises
    const createdOrders = orders.map((result) => result.value);

    // Create orders in the database
    await Order.create(createdOrders);

    // Respond with the created orders
    return res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// [SECTION] Retrieve authenticated user's orders
module.exports.retrieveOrders = async (req, res) => {
  // Check if the user is an admin
  if (req.user.isAdmin) {
    return res.send(false);
  }

  try {
    // Get the user ID from the request
    const userId = req.user.id;

    // Retrieve orders for the user
    const orders = await Order.find({ userId }).exec();
    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
    
// [SECTION] Retrieve All Orders [ADMIN]
module.exports.retrieveAllOrders = (req, res) => {
      
      return Order.find({}).then(result =>{
        
          return res.send(result);
    });

  }




