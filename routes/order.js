const express = require("express");
const auth = require("../auth");
const orderController = require("../controllers/order");
const productController = require("../controllers/product");

const { verify, verifyAdmin } = auth;

const router = express.Router();

// Route for adding product to cart
router.post("/create", verify, orderController.createOrders);

// Route for removing product to cart
router.get("/retrieveOrders", verify, orderController.retrieveOrders);

// Route for calculating total of items in the cart
router.get("/retrieveAll", verify, verifyAdmin, orderController.retrieveAllOrders)



module.exports = router;