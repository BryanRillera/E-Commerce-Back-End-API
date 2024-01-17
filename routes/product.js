// [SECTION] Dependencies and Modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

// [SECTION] Routing Component
const router = express.Router(); 

// Route for creating a new product
router.post("/add", verify, verifyAdmin, productController.addProduct);

// Route for retrieving all products
router.get("/all", productController.getAllProduct);

// Route for retrieving all active products
router.get("/activeproducts", productController.getAllActiveProduct);

// Route for retrieving a single product
router.get("/:productId", productController.getProduct);

// Route for updating a product (Admin Only)
router.put("/:productId/update", verify, verifyAdmin, productController.updatedProduct);

// Route for archiving products (Admin Only)
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// Route for activating products (Admin Only)
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

router.post("/search", productController.searchDogBreed);

// [SECTION] Export Route System
module.exports = router;
