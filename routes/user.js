// [SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

// [SECTION] Routing Component
const router = express.Router();

// [SECTION] Routes

// Route for checking if the user's email already exist in the database
router.post("/check", userController.checkEmailExists);

// Route for user registration
router.post("/register", userController.registerUser);

// Route for user Authentication
router.post("/login", userController.loginUser);

// Route for retrieving user details
router.get("/details", verify, userController.getProfile);

// Route for Updating user status
router.put("/updateStatus", verify, verifyAdmin, userController.updateStatus);

// POST route for resetting the password
router.put('/reset-password', verify, userController.resetPassword);

// Update user profile route
router.put('/profile', verify, userController.updateProfile);

module.exports = router;


